# 001. Refactoring Monolithic API Logic to Domain Layer

**Date:** 2026-01-11
**Status:** Accepted

## Context
The `apps/api/main.py` file was becoming a "God Object," containing routing, business logic (order validation, catalog filtering), and data access code. This made:
1.  **Testing difficult**: Unit testing required mocking the entire DB session or running full integration tests.
2.  **Maintainability low**: Adding features (like Discounts) risked breaking unrelated routing logic.
3.  **Readability poor**: Logic was buried inside route handlers.

## Decision
We decided to extract business logic into a dedicated **Domain Layer** (`apps/api/domain/`).
- **`orders.py`**: Handles order creation, stock checks, and total calculation.
- **`catalog.py`**: Handles product search and usage of SQLAlchemy `select` builders.
- **`cart.py`**: Handles cart validation rules.
- **`discounts.py`**: Handles pure logic for discount calculations (Zero-dependency).

The `main.py` file now strictly handles **Routing** and **Dependency Injection** (`get_db`), delegating work to the domain layer.

## Consequences
### Positive
- **Testability**: `discounts.py` and `orders.py` can be tested in isolation (TDD enabled).
- **Clarity**: Route handlers are thin (3-5 lines), making the API surface easy to scan.
- **Scalability**: New features (Warranties, Returns) have a clear home.

### Negative
- **Complexity**: Requires managing more files and imports.
- **Boilerplate**: Some service functions might just wrap DB calls, feeling redundant for simple CRUD.

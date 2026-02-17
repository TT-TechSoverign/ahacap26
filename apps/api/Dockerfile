# Stage 1: Builder
FROM python:3.12-alpine as builder

# Install build dependencies for asyncpg
# UV requires minimal system deps, but compiling asyncpg/packages might still need gcc
RUN apk update && apk add --no-cache gcc musl-dev python3-dev libffi-dev

WORKDIR /app

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

# Create virtual environment
ENV VIRTUAL_ENV=/app/.venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
RUN uv venv

# Install dependencies using uv
COPY requirements.txt .
# Use uv pip install for speed
RUN uv pip install --no-cache -r requirements.txt

# Stage 2: Final Runtime
FROM python:3.12-alpine as runner

WORKDIR /app

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Install curl for healthcheck
RUN apk add --no-cache curl

# Create virtual environment directory and copy from builder
ENV VIRTUAL_ENV=/app/.venv
ENV PATH="$VIRTUAL_ENV/bin:$PATH"

COPY --from=builder /app/.venv /app/.venv

# Copy application code
COPY . .

# Set ownership
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
import enum
from database import Base
from datetime import datetime

class OrderStatus(str, enum.Enum):
    CART = "CART"
    LOCK_STOCK = "LOCK_STOCK" # Internal reservation
    AWAIT_PAYMENT = "AWAIT_PAYMENT"
    PAID = "PAID"
    FULFILLED = "FULFILLED"

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    price = Column(Integer)
    category = Column(String, index=True)
    stock = Column(Integer)

class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, index=True) # UUID or Order #
    status = Column(String, default=OrderStatus.AWAIT_PAYMENT)
    total_cents = Column(Integer)
    stripe_pid = Column(String, nullable=True)
    idempotency_key = Column(String, unique=True, index=True, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

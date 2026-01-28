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
    SHIPPED = "SHIPPED"
    DELIVERED = "DELIVERED"
    CANCELLED = "CANCELLED"

class LeadStatus(str, enum.Enum):
    NEW = "NEW"
    CONTACTED = "CONTACTED"
    SCHEDULED = "SCHEDULED"
    COMPLETED = "COMPLETED"
    ARCHIVED = "ARCHIVED"

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    price = Column(Integer)
    category = Column(String, index=True)
    stock = Column(Integer)
    image_url = Column(String, nullable=True) # [NEW] Support for custom images
    btu = Column(Integer, nullable=True)
    voltage = Column(String, nullable=True)
    coverage = Column(String, nullable=True)
    performance_specs = Column(String, nullable=True)
    key_spec = Column(String, nullable=True)
    noise_level = Column(String, nullable=True)
    dehumidification = Column(String, nullable=True)

class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    email = Column(String, index=True)
    phone = Column(String)
    address = Column(String)
    city = Column(String)
    zip = Column(String)
    service_type = Column(String)
    urgency = Column(String)
    notes = Column(String, nullable=True)
    status = Column(String, default=LeadStatus.NEW)
    created_at = Column(DateTime, default=datetime.utcnow)

class Order(Base):
    __tablename__ = "orders"

    id = Column(String, primary_key=True, index=True) # UUID or Order #
    status = Column(String, default=OrderStatus.AWAIT_PAYMENT)
    total_cents = Column(Integer)
    stripe_pid = Column(String, nullable=True)
    customer_email = Column(String, nullable=True) # [NEW]
    items_json = Column(String, nullable=True) # Snapshots of products
    idempotency_key = Column(String, unique=True, index=True, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class ContentPage(Base):
    __tablename__ = "content_pages"

    path = Column(String, primary_key=True, index=True)
    data = Column(String, nullable=True) # JSON String (Published)
    draft_data = Column(String, nullable=True) # JSON String (Draft)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class ContentSnippet(Base):
    __tablename__ = "content_snippets"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    data = Column(String, nullable=False) # JSON string of component data
    created_at = Column(DateTime, default=datetime.utcnow)

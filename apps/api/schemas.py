from pydantic import BaseModel
from typing import Optional

class ProductBase(BaseModel):
    name: str
    price: int
    category: str
    stock: int
    image_url: Optional[str] = None
    btu: Optional[int] = None
    voltage: Optional[str] = None
    coverage: Optional[str] = None
    performance_specs: Optional[str] = None
    key_spec: Optional[str] = None
    noise_level: Optional[str] = None
    dehumidification: Optional[str] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[int] = None
    category: Optional[str] = None
    stock: Optional[int] = None
    image_url: Optional[str] = None
    btu: Optional[int] = None
    voltage: Optional[str] = None
    coverage: Optional[str] = None
    performance_specs: Optional[str] = None
    key_spec: Optional[str] = None
    noise_level: Optional[str] = None
    dehumidification: Optional[str] = None

class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True

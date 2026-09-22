from pydantic import BaseModel
from typing import Optional

class ProductBase(BaseModel):
    name: str
    price: int
    category: str
    subcategory: Optional[str] = None # Added to match DB model
    stock: int
    image_url: Optional[str] = None
    btu: Optional[int] = None
    voltage: Optional[str] = None
    coverage: Optional[str] = None
    coverage_aham: Optional[str] = None
    coverage_oahu: Optional[str] = None
    sizing_notes: Optional[str] = None
    performance_specs: Optional[str] = None
    key_spec: Optional[str] = None
    noise_level: Optional[str] = None
    dehumidification: Optional[str] = None
    dimensions: Optional[str] = None
    weight: Optional[str] = None
    shipping_weight: Optional[str] = None
    min_window_width: Optional[str] = None
    max_window_width: Optional[str] = None
    min_window_height: Optional[str] = None
    chassis_type: Optional[str] = None
    ceer_rating: Optional[str] = None
    dry_air_flow_cfm: Optional[str] = None
    warranty: Optional[str] = None
    promo_price: Optional[int] = None
    discount_percent: Optional[int] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    price: Optional[int] = None
    category: Optional[str] = None
    subcategory: Optional[str] = None
    stock: Optional[int] = None
    image_url: Optional[str] = None
    btu: Optional[int] = None
    voltage: Optional[str] = None
    coverage: Optional[str] = None
    coverage_aham: Optional[str] = None
    coverage_oahu: Optional[str] = None
    sizing_notes: Optional[str] = None
    performance_specs: Optional[str] = None
    key_spec: Optional[str] = None
    noise_level: Optional[str] = None
    dehumidification: Optional[str] = None
    dimensions: Optional[str] = None
    weight: Optional[str] = None
    shipping_weight: Optional[str] = None
    min_window_width: Optional[str] = None
    max_window_width: Optional[str] = None
    min_window_height: Optional[str] = None
    chassis_type: Optional[str] = None
    ceer_rating: Optional[str] = None
    dry_air_flow_cfm: Optional[str] = None
    warranty: Optional[str] = None
    promo_price: Optional[int] = None
    discount_percent: Optional[int] = None

class Product(ProductBase):
    id: int

    class Config:
        from_attributes = True

class InventoryValidationItem(BaseModel):
    product_id: int
    requested_quantity: int

class InventoryValidationRequest(BaseModel):
    items: list[InventoryValidationItem]

class ValidationResult(BaseModel):
    product_id: int
    name: str
    price: int
    requested_quantity: int
    available_stock: int
    is_available: bool

class InventoryValidationResponse(BaseModel):
    valid: bool
    results: list[ValidationResult]

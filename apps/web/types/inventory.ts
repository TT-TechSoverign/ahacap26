export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    subcategory?: string;
    stock: number;
    image_url?: string;
    btu?: number;
    voltage?: string;
    coverage?: string;
    noise_level?: string;
    dehumidification?: string;
    performance_specs?: string;
    key_spec?: string;
    dimensions?: string;
    weight?: string;
    warranty?: string;
    promo_price?: number;
    discount_percent?: number;
}

export interface CartItem extends Product {
    quantity: number;
}

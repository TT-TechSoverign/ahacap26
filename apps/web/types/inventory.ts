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
    coverage_aham?: string;
    coverage_oahu?: string;
    sizing_notes?: string;
    shipping_weight?: string;
    min_window_width?: string;
    max_window_width?: string;
    min_window_height?: string;
    chassis_type?: string;
    ceer_rating?: string;
    dry_air_flow_cfm?: string;
}

export interface CartItem extends Product {
    quantity: number;
}

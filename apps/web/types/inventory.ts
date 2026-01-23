export interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    stock: number;
    image_url?: string;
    btu?: number;
    voltage?: string;
    coverage?: string;
    noise_level?: string;
    dehumidification?: string;
}

export interface CartItem extends Product {
    quantity: number;
}

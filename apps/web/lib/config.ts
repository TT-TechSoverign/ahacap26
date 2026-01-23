export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api/v1';

export const CONFIG = {
    API_URL: API_BASE_URL,
    IS_PROD: process.env.NODE_ENV === 'production',
    IS_DEV: process.env.NODE_ENV === 'development',
    ENDPOINTS: {
        PRODUCTS: `${API_BASE_URL}/products`,
        CART: `${API_BASE_URL}/cart`,
        CHECKOUT: `${API_BASE_URL}/checkout`,
    }
} as const;

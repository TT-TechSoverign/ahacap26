'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import { CartItem, Product } from '../types/inventory';

interface CartContextType {
    items: CartItem[];
    isOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    addToCart: (product: Product) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
    submitOrder: (email: string) => Promise<any>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem('ahac_cart');
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        localStorage.setItem('ahac_cart', JSON.stringify(items));
    }, [items]);

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const addToCart = (product: Product) => {
        setItems(current => {
            const existing = current.find(item => item.id === product.id);
            if (existing) {
                return current.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...current, { ...product, quantity: 1 }];
        });
        setIsOpen(true);
    };

    const removeFromCart = (id: number) => {
        setItems(current => current.filter(item => item.id !== id));
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = items.reduce((count, item) => count + item.quantity, 0);

    const submitOrder = async (email: string) => {
        try {
            const orderPayload = {
                items: items.map(item => ({
                    product_id: item.id,
                    name: item.name,
                    category: item.category,
                    quantity: item.quantity
                })),
                customer_email: email,
                shipping_method: "PICKUP_AIEA"
            };

            const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/v1';
            console.log("🛒 Submitting Order:", { apiUrl, orderPayload });

            const res = await fetch(`${apiUrl}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderPayload)
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.detail || 'Order submission failed');
            }

            // Success
            setItems([]); // Clear cart
            return data;
        } catch (error) {
            console.error("Checkout Error:", error);
            throw error;
        }
    };

    return (
        <CartContext.Provider value={{
            items, isOpen, openCart, closeCart, addToCart, removeFromCart, clearCart, cartTotal, cartCount, submitOrder
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

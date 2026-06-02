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
    syncInventory: () => Promise<void>;
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

        // GTM E-Commerce add_to_cart push
        if (typeof window !== 'undefined' && (window as any).dataLayer) {
            (window as any).dataLayer.push({
                event: 'add_to_cart',
                ecommerce: {
                    currency: 'USD',
                    value: product.price,
                    items: [
                        {
                            item_id: String(product.id),
                            item_name: product.name,
                            price: product.price,
                            quantity: 1
                        }
                    ]
                }
            });
        }

        setIsOpen(true);
    };

    const removeFromCart = (id: number) => {
        const itemToRemove = items.find(item => item.id === id);
        setItems(current => current.filter(item => item.id !== id));

        // GTM E-Commerce remove_from_cart push
        if (itemToRemove && typeof window !== 'undefined' && (window as any).dataLayer) {
            (window as any).dataLayer.push({
                event: 'remove_from_cart',
                ecommerce: {
                    currency: 'USD',
                    value: itemToRemove.price * itemToRemove.quantity,
                    items: [
                        {
                            item_id: String(itemToRemove.id),
                            item_name: itemToRemove.name,
                            price: itemToRemove.price,
                            quantity: itemToRemove.quantity
                        }
                    ]
                }
            });
        }
    };

    const clearCart = () => {
        setItems([]);
    };

    const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const cartCount = items.reduce((count, item) => count + item.quantity, 0);

    const syncInventory = async () => {
        if (items.length === 0) return;
        try {
            const payload = {
                items: items.map(item => ({
                    product_id: item.id,
                    requested_quantity: item.quantity
                }))
            };
            const res = await fetch('/api/v1/products/validate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (res.ok) {
                const data = await res.json();
                setItems(current => current.map(item => {
                    const validation = data.results.find((r: any) => r.product_id === item.id);
                    if (validation) {
                        return { 
                            ...item, 
                            stock: validation.available_stock,
                            price: validation.price // Also sync the canonical price
                        };
                    }
                    return item;
                }));
            }
        } catch (error) {
            console.error("Failed to sync inventory", error);
        }
    };

    return (
        <CartContext.Provider value={{
            items, isOpen, openCart, closeCart, addToCart, removeFromCart, clearCart, cartTotal, cartCount, syncInventory
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

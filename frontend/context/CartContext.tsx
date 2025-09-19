import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { CartItem, Sweet, Order } from '../types';
import { useAuth } from './AuthContext';
import { useSweets } from './SweetContext';
import { orderService } from '../services/orderService';

interface CartContextType {
    cart: CartItem[];
    orders: Order[];
    addToCart: (sweet: Sweet, quantity: number) => void;
    removeFromCart: (sweetId: string) => void;
    updateCartQuantity: (sweetId: string, quantity: number) => void;
    clearCart: () => void;
    checkout: () => Promise<void>;
    cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const { user } = useAuth();
    const { fetchSweets } = useSweets(); // Get refetch function from SweetContext

    // Load initial cart and order data when user logs in
    useEffect(() => {
        const loadUserData = async () => {
            if (user) {
                try {
                    const [userCart, userOrders] = await Promise.all([
                        orderService.getCartForUser(),
                        orderService.getOrdersForUser()
                    ]);
                    setCart(userCart);
                    setOrders(userOrders);
                } catch (error) {
                    console.error("Failed to load user data:", error);
                }
            } else {
                setCart([]);
                setOrders([]);
            }
        };
        loadUserData();
    }, [user]);

    // Persist cart changes to our backend service
    useEffect(() => {
        if (user) {
            orderService.saveCartForUser(cart).catch(err => console.error("Failed to save cart:", err));
        }
    }, [cart, user]);


    const addToCart = (sweet: Sweet, quantity: number) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === sweet.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === sweet.id
                        ? { ...item, purchaseQuantity: Math.min(item.quantity, item.purchaseQuantity + quantity) }
                        : item
                );
            }
            return [...prevCart, { ...sweet, purchaseQuantity: quantity }];
        });
    };

    const removeFromCart = (sweetId: string) => {
        setCart(prevCart => prevCart.filter(item => item.id !== sweetId));
    };

    const updateCartQuantity = (sweetId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(sweetId);
            return;
        }
        setCart(prevCart => 
            prevCart.map(item => item.id === sweetId ? { ...item, purchaseQuantity: Math.min(item.quantity, quantity) } : item)
        );
    };

    const clearCart = () => {
        setCart([]);
    };
    
    const checkout = async () => {
        if (!user || cart.length === 0) return;

        try {
            const newOrder = await orderService.createOrder(cart);
            setOrders(prevOrders => [...prevOrders, newOrder]);
            clearCart();
            // After successful checkout, refetch sweets to get updated stock counts
            await fetchSweets(); 
        } catch(error: any) {
            console.error("Checkout failed:", error);
            alert(`Checkout failed: ${error.message}. Please try again.`);
            // Refetch sweets to ensure local stock count is accurate after a failed transaction
            await fetchSweets();
        }
    };

    const cartTotal = cart.reduce((sum, item) => sum + item.price * item.purchaseQuantity, 0);

    return (
        <CartContext.Provider value={{ cart, orders, addToCart, removeFromCart, updateCartQuantity, clearCart, checkout, cartTotal }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

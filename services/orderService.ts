import { CartItem, Order } from '../types';

const API_URL = 'http://localhost:5000/api/orders';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : '',
    };
};

export const orderService = {
    // --- Cart Management ---
    getCartForUser: async (): Promise<CartItem[]> => {
        const response = await fetch(`${API_URL}/cart`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error('Failed to get cart');
        return await response.json();
    },

    saveCartForUser: async (cart: CartItem[]): Promise<void> => {
        await fetch(`${API_URL}/cart`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ cart })
        });
        // We don't need to handle the response unless there's an error
    },

    // --- Order Management ---
    getOrdersForUser: async (): Promise<Order[]> => {
        const response = await fetch(`${API_URL}/myorders`, { headers: getAuthHeaders() });
        if (!response.ok) throw new Error('Failed to get orders');
        return await response.json();
    },

    createOrder: async (cart: CartItem[]): Promise<Order> => {
        const total = cart.reduce((sum, item) => sum + item.price * item.purchaseQuantity, 0);
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ items: cart, total })
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to create order');
        }
        return await response.json();
    }
};

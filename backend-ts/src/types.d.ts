export declare enum Role {
    USER = "USER",
    ADMIN = "ADMIN"
}
export interface User {
    id: string;
    email: string;
    role: Role;
}
export interface Sweet {
    id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    imageUrl: string;
    description: string;
}
export interface CartItem extends Sweet {
    purchaseQuantity: number;
}
export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    date: string;
}
//# sourceMappingURL=types.d.ts.map
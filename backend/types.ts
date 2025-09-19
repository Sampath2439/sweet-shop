export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN'
}

// This is the interface used by the Sweet model.
// It matches the frontend but is defined independently here for architectural separation.
export interface Sweet {
    id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
    imageUrl: string;
    description: string;
}

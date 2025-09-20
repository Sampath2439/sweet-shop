import mongoose from 'mongoose';
declare const Order: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    date: NativeDate;
    user: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        name: string;
        purchaseQuantity: number;
        description: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        purchaseQuantity: number;
        description: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string;
    }> & {
        name: string;
        purchaseQuantity: number;
        description: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string;
    }>;
    total: number;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    date: NativeDate;
    user: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        name: string;
        purchaseQuantity: number;
        description: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        purchaseQuantity: number;
        description: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string;
    }> & {
        name: string;
        purchaseQuantity: number;
        description: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string;
    }>;
    total: number;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    date: NativeDate;
    user: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        name: string;
        purchaseQuantity: number;
        description: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        purchaseQuantity: number;
        description: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string;
    }> & {
        name: string;
        purchaseQuantity: number;
        description: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string;
    }>;
    total: number;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    date: NativeDate;
    user: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        name: string;
        purchaseQuantity: number;
        description: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        purchaseQuantity: number;
        description: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string;
    }> & {
        name: string;
        purchaseQuantity: number;
        description: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string;
    }>;
    total: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    date: NativeDate;
    user: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        name: string;
        purchaseQuantity: number;
        description: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        purchaseQuantity: number;
        description: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string;
    }> & {
        name: string;
        purchaseQuantity: number;
        description: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string;
    }>;
    total: number;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    date: NativeDate;
    user: mongoose.Types.ObjectId;
    items: mongoose.Types.DocumentArray<{
        name: string;
        purchaseQuantity: number;
        description: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        name: string;
        purchaseQuantity: number;
        description: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string;
    }> & {
        name: string;
        purchaseQuantity: number;
        description: string;
        category: string;
        price: number;
        quantity: number;
        imageUrl: string;
    }>;
    total: number;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Order;
//# sourceMappingURL=orderModel.d.ts.map
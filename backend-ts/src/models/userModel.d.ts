import mongoose from 'mongoose';
import { Role } from '../types';
declare const User: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    role: Role;
    cart: mongoose.Types.DocumentArray<{
        sweet: mongoose.Types.ObjectId;
        purchaseQuantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        sweet: mongoose.Types.ObjectId;
        purchaseQuantity: number;
    }> & {
        sweet: mongoose.Types.ObjectId;
        purchaseQuantity: number;
    }>;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    role: Role;
    cart: mongoose.Types.DocumentArray<{
        sweet: mongoose.Types.ObjectId;
        purchaseQuantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        sweet: mongoose.Types.ObjectId;
        purchaseQuantity: number;
    }> & {
        sweet: mongoose.Types.ObjectId;
        purchaseQuantity: number;
    }>;
}, {}, {
    timestamps: true;
}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    role: Role;
    cart: mongoose.Types.DocumentArray<{
        sweet: mongoose.Types.ObjectId;
        purchaseQuantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        sweet: mongoose.Types.ObjectId;
        purchaseQuantity: number;
    }> & {
        sweet: mongoose.Types.ObjectId;
        purchaseQuantity: number;
    }>;
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
    email: string;
    password: string;
    role: Role;
    cart: mongoose.Types.DocumentArray<{
        sweet: mongoose.Types.ObjectId;
        purchaseQuantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        sweet: mongoose.Types.ObjectId;
        purchaseQuantity: number;
    }> & {
        sweet: mongoose.Types.ObjectId;
        purchaseQuantity: number;
    }>;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    role: Role;
    cart: mongoose.Types.DocumentArray<{
        sweet: mongoose.Types.ObjectId;
        purchaseQuantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        sweet: mongoose.Types.ObjectId;
        purchaseQuantity: number;
    }> & {
        sweet: mongoose.Types.ObjectId;
        purchaseQuantity: number;
    }>;
}>, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>> & mongoose.FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    email: string;
    password: string;
    role: Role;
    cart: mongoose.Types.DocumentArray<{
        sweet: mongoose.Types.ObjectId;
        purchaseQuantity: number;
    }, mongoose.Types.Subdocument<mongoose.mongo.BSON.ObjectId, any, {
        sweet: mongoose.Types.ObjectId;
        purchaseQuantity: number;
    }> & {
        sweet: mongoose.Types.ObjectId;
        purchaseQuantity: number;
    }>;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default User;
//# sourceMappingURL=userModel.d.ts.map
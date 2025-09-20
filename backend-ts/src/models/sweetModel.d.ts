import mongoose from 'mongoose';
import { Sweet as ISweet } from '../types';
declare const Sweet: mongoose.Model<Omit<ISweet, "id">, {}, {}, {}, mongoose.Document<unknown, {}, Omit<ISweet, "id">, {}, mongoose.DefaultSchemaOptions> & Omit<ISweet, "id"> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<Omit<ISweet, "id">, mongoose.Model<Omit<ISweet, "id">, any, any, any, mongoose.Document<unknown, any, Omit<ISweet, "id">, any, {}> & Omit<ISweet, "id"> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Omit<ISweet, "id">, mongoose.Document<unknown, {}, mongoose.FlatRecord<Omit<ISweet, "id">>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<Omit<ISweet, "id">> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default Sweet;
//# sourceMappingURL=sweetModel.d.ts.map
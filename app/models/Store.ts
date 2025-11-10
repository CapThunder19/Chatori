import mongoose, { Document, Schema } from 'mongoose';

export interface IStore extends Document {
    name: string;
    phone: string;
    openingTime: string;
    closingTime: string;
    imagePath?: string;
    location: {
        lat: number;
        lng: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

const StoreSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    openingTime: { type: String, required: true },
    closingTime: { type: String, required: true },
    imagePath: { type: String },
    foods: [{
        name: { type: String, required: true, trim: true },
        description: { type: String, trim: true },
        price: { type: String, trim: true },
    }],
    reviews: [{
        name: { type: String, trim: true },
        rating: { type: Number, required: true },
        comment: { type: String, trim: true },
        createdAt: { type: Date, default: Date.now }
    }],
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
}, { timestamps: true });

export const Store = mongoose.models.Store || mongoose.model<IStore>('Store', StoreSchema);

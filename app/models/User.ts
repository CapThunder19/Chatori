import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new mongoose.Schema({
    firstName: { 
        type: String, 
        required: [true, "First name is required"],
        trim: true,
        maxlength: [50, "First name cannot exceed 50 characters"]
    },
    lastName: { 
        type: String, 
        required: [true, "Last name is required"],
        trim: true,
        maxlength: [50, "Last name cannot exceed 50 characters"]
    },
    email: { 
        type: String, 
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
       
    },
    password: { 
        type: String, 
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
}, { timestamps: true });





UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
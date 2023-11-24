import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

export const userSchema = new Schema<TUser>({
    userId: { type: Number, required: true },
    username: { type: String, required: true ,trim:true,unique:true},
    password: { type: String, required: true },
    fullName: {
        firstName: { type: String, required: true,trim: true },
        lastName: { type: String, required: true,trim: true },
    },
    age: { type: Number, required: true },
    email: { type: String, required: true,trim:true,unique: true },
    isActive: { type: Boolean, required: true ,default:true},
    hobbies: { type: [String], default: [], trim: true},
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
    },
});


// 3. Create a Model.
export const User = model<TUser>('User', userSchema);
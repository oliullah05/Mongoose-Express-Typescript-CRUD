"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const OrderSchemaValidation = zod_1.z.object({
    productName: zod_1.z.string({ required_error: 'Product name is required' }),
    price: zod_1.z.number({ required_error: 'Price is required' }),
    quantity: zod_1.z.number({ required_error: 'Quantity is required' }),
});
// Zod validation schema for the User
const UserSchemaZodValidation = zod_1.z.object({
    userId: zod_1.z.number({ required_error: 'User ID is required' }),
    username: zod_1.z.string({ required_error: 'Username is required' }),
    password: zod_1.z.string({ required_error: 'Password is required' }).min(6),
    fullName: zod_1.z.object({
        firstName: zod_1.z.string({ required_error: 'First name is required' }),
        lastName: zod_1.z.string({ required_error: 'Last name is required' }),
    }),
    age: zod_1.z.number({ required_error: 'Age is required' }),
    email: zod_1.z.string({ required_error: 'Email is required' }).email(),
    isActive: zod_1.z.boolean({ required_error: 'isActive is required' }),
    hobbies: zod_1.z.array(zod_1.z.string()).default([]),
    address: zod_1.z.object({
        street: zod_1.z.string({ required_error: 'Street is required' }),
        city: zod_1.z.string({ required_error: 'City is required' }),
        country: zod_1.z.string({ required_error: 'Country is required' }),
    }),
    orders: zod_1.z.array(OrderSchemaValidation).default([]),
});
exports.default = UserSchemaZodValidation;

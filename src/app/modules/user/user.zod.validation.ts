import { z } from 'zod';



const OrderSchemaValidation = z.object({
  productName: z.string({ required_error: 'Product name is required' }),
  price: z.number({ required_error: 'Price is required' }),
  quantity: z.number({ required_error: 'Quantity is required' }),
});
  
  // Zod validation schema for the User
  const UserSchemaZodValidation = z.object({
    userId: z.number({ required_error: 'User ID is required' }),
    username: z.string({ required_error: 'Username is required' }),
    password: z.string({ required_error: 'Password is required' }).min(6),
    fullName: z.object({
      firstName: z.string({ required_error: 'First name is required' }),
      lastName: z.string({ required_error: 'Last name is required' }),
    }),
    age: z.number({ required_error: 'Age is required' }),
    email: z.string({ required_error: 'Email is required' }).email(),
    isActive: z.boolean({ required_error: 'isActive is required'}),
    hobbies: z.array(z.string()).default([]),
    address: z.object({
      street: z.string({ required_error: 'Street is required' }),
      city: z.string({ required_error: 'City is required' }),
      country: z.string({ required_error: 'Country is required' }),
    }),
    orders: z.array(OrderSchemaValidation).default([]),
    
  });

  
  export default UserSchemaZodValidation;
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (userData: TUser) => {

    const result = await User.create(userData);
    return result;
  };

const getUserFromDB = async ()=>{
  const result = await User.aggregate([
    {$project: {username:1, fullName:1, age:1, email:1, address:1,_id:0}}
  ])
  return result;
}


const getSingleUserFromDB =async(id:string)=>{
  const result = await User.findOne({userId:id},{password:0});
  return result;
}


const updateSingleUserIntoDB = async (userId: number, updatedUserData: any) => {
  const user = await User.findOneAndUpdate({ userId }, updatedUserData, {
    new: true,
    runValidators: true,
    select: '-password',
  });

  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }
}


const deleteSingleUserFromDB = async (userId: number) => {
  const user = await User.findOneAndDelete({ userId });

  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }
  return user;
};



const addProductToOrderFromDB = async (userId: number, productData: any) => {
  const user = await User.findOne({ userId });

  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }

  if (!user.orders) {
    user.orders = [];
  }

  user.orders.push(productData);
  await user.save();
  return user.orders;
};





const getUserOrdersFromDB = async (userId: number) => {
  const user = await User.findOne({ userId:userId });

  if (!user) {
    const error = new Error('User not found') as any;
    error.statusCode = 404;
    throw error;
  }
  return user ? user.orders : null;
};












  export const userService = {
    createUserIntoDB,
    getUserFromDB,
    getSingleUserFromDB,
    updateSingleUserIntoDB,
    deleteSingleUserFromDB,
    addProductToOrderFromDB,
    getUserOrdersFromDB
  
  };
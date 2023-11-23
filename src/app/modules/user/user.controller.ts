import { Request, Response } from 'express';
import { userService } from './user.service';
import { userSchema } from './user.model';
import { TUser } from './user.interface';
const createUser = async (req: Request, res: Response) => {
    try {
      const userData = req.body;
      const result = await userService.createUserIntoDB(userData);
      const withoutPassword =delete(userData.password )
      //send response here
      res.status(200).json({
        success: true,
        message: 'user created successfully',
        data: userData,
      });
     

    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message || "user can't created successfully",
        error: err,
      });
    }
  };

const getAllUser =async(req: Request, res: Response)=>{
   try{
    const result = await userService.getUserFromDB();
    res.status(200).json({
        success: true,
        message: "Users fetched successfully!",
        data: result,
      });
     
   }
   catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "user fetched unsuccessfull",
      error: err,
    });
  }
   
}



const getSingleUser =async (req: Request, res: Response)=>{
    try {
        const userId = req.params.userId;
        const result = await userService.getSingleUserFromDB(userId);
        res.status(200).json({
          success: true,
          message: 'User fetched successfully!',
          data: result,
        });
  
      } catch (err: any) {
        res.status(500).json({
          success: false,
          message: err.message || "User not found",
          error: {
            code: 404,
            description: "User not found!"
        }
        });
      }
}

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body;
    const updatedUser = await userService.updateSingleUserIntoDB(
      Number(userId),
      updatedUserData,
    );
    delete(updatedUserData.password)

    res.json({
      success: true,
      message: 'User updated successfully!',
      data: updatedUserData,
    });
  } catch (err: any) {
   
     res.status(404).json({
        success: false,
        message: err.message || 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
  
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const  userId  = req.params.userId;
 const deleteUser = await userService.deleteSingleUserFromDB(Number(userId));
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } 
  catch (err: any) {
     res.status(404).json({
        success: false,
        message:err.message ||  'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
}
}


  export const userController ={
    createUser,
    getAllUser,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser
  }
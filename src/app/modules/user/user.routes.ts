import express from 'express';
import { userController } from './user.controller';


const router = express.Router();
router.post('/', userController.createUser);
router.get('/', userController.getAllUser);
router.get('/:userId', userController.getSingleUser);
router.put('/:userId', userController.updateSingleUser);
router.delete('/:userId', userController.deleteSingleUser);
router.get('/:userId/orders', userController.getUserOrders);
router.put('/:userId/orders', userController.addProductToOrder);

export const userRoutes = router;
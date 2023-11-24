"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("./user.service");
const user_zod_validation_1 = __importDefault(require("./user.zod.validation"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const zodParseData = user_zod_validation_1.default.parse(userData);
        const result = yield user_service_1.userService.createUserIntoDB(zodParseData);
        const withoutPassword = delete (userData.password);
        //send response here
        res.status(200).json({
            success: true,
            message: 'user created successfully',
            data: userData,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "user can't created successfully",
            error: err,
        });
    }
});
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.userService.getUserFromDB();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "user fetched unsuccessfull",
            error: err,
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const result = yield user_service_1.userService.getSingleUserFromDB(userId);
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!"
            }
        });
    }
});
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const updatedUserData = req.body;
        const updatedUser = yield user_service_1.userService.updateSingleUserIntoDB(Number(userId), updatedUserData);
        delete (updatedUserData.password);
        res.json({
            success: true,
            message: 'User updated successfully!',
            data: updatedUserData,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const deleteSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const deleteUser = yield user_service_1.userService.deleteSingleUserFromDB(Number(userId));
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: 'User not found',
            error: {
                code: 404,
                description: 'User not found!',
            },
        });
    }
});
const addProductToOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const productData = req.body;
        yield user_service_1.userService.addProductToOrderFromDB(Number(userId), productData);
        res.json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'Order not found',
            error: {
                code: 404,
                description: 'Order not found!',
            },
        });
    }
});
const getUserOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const orders = yield user_service_1.userService.getUserOrdersFromDB(Number(userId));
        if (!orders) {
            return res.status(404).json({
                success: false,
                message: 'Order not found!',
            });
        }
        res.json({
            success: true,
            message: 'Orders fetched successfully!',
            data: {
                orders,
            },
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: 'Order not found',
            error: {
                code: 404,
                description: 'Oder not found!',
            },
        });
    }
});
exports.userController = {
    createUser,
    getAllUser,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
    addProductToOrder,
    getUserOrders
};

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(userData);
    return result;
});
const getUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.aggregate([
        { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 } }
    ]);
    return result;
});
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findOne({ userId: id }, { password: 0 });
    return result;
});
const updateSingleUserIntoDB = (userId, updatedUserData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOneAndUpdate({ userId }, updatedUserData, {
        new: true,
        runValidators: true,
        select: '-password',
    });
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
});
const deleteSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOneAndDelete({ userId });
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    return user;
});
const addProductToOrderFromDB = (userId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ userId });
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    if (!user.orders) {
        user.orders = [];
    }
    user.orders.push(productData);
    yield user.save();
    return user.orders;
});
const getUserOrdersFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ userId: userId });
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }
    return user ? user.orders : null;
});
exports.userService = {
    createUserIntoDB,
    getUserFromDB,
    getSingleUserFromDB,
    updateSingleUserIntoDB,
    deleteSingleUserFromDB,
    addProductToOrderFromDB,
    getUserOrdersFromDB
};

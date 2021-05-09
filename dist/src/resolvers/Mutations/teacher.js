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
exports.login = exports.signup = void 0;
const teacher_1 = __importDefault(require("../../../model/teacher"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signup = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    let existingTeacher;
    try {
        existingTeacher = yield teacher_1.default.findOne({ email: args.email });
    }
    catch (e) {
        throw new Error("Network error");
    }
    if (existingTeacher) {
        throw new Error("Email already taken");
    }
    let hashedPassword;
    try {
        hashedPassword = yield bcryptjs_1.default.hash(args.password, 12);
    }
    catch (e) {
        throw new Error("Network error");
    }
    let newTeacher;
    try {
        newTeacher = yield teacher_1.default.create(Object.assign(Object.assign({}, args), { password: hashedPassword }));
    }
    catch (e) {
        throw new Error("Network error");
    }
    const token = jsonwebtoken_1.default.sign({ id: newTeacher._id }, process.env.SECRET);
    const returnData = {
        user: newTeacher,
        token,
        expirationTime: 1,
    };
    return returnData;
});
exports.signup = signup;
const login = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingTeacher = yield teacher_1.default.findOne({ email: args.email });
        if (!existingTeacher) {
            throw new Error("Email doesnot exist");
        }
        const match = yield bcryptjs_1.default.compare(args.password, existingTeacher.password);
        if (!match) {
            throw new Error("Incorrect password");
        }
        const token = jsonwebtoken_1.default.sign({ id: existingTeacher._id }, process.env.SECRET);
        const returnData = {
            user: existingTeacher,
            token,
        };
        return returnData;
    }
    catch (e) {
        throw new Error("Network error");
    }
});
exports.login = login;
//# sourceMappingURL=teacher.js.map
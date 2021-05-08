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
exports.signup = void 0;
const teacher_1 = __importDefault(require("../../../model/teacher"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const signup = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    let existingTeacher;
    try {
        existingTeacher = yield teacher_1.default.findOne({ email: args.data.email });
    }
    catch (e) {
        throw new Error(e);
    }
    if (existingTeacher) {
        throw new Error("email already in use");
    }
    let hashedPassword;
    try {
        hashedPassword = yield bcryptjs_1.default.hash(args.data.password, 12);
    }
    catch (e) {
        throw new Error();
    }
    let newTeacher;
    try {
        newTeacher = yield teacher_1.default.create(Object.assign(Object.assign({}, args.data), { password: hashedPassword }));
    }
    catch (e) {
        throw new Error(e);
    }
    const token = jsonwebtoken_1.default.sign({ id: newTeacher._id, userName: newTeacher.userName }, process.env.SECRET);
    const returnData = {
        user: newTeacher,
        token,
        expirationTime: 1,
    };
    return returnData;
});
exports.signup = signup;
//# sourceMappingURL=teacher.js.map
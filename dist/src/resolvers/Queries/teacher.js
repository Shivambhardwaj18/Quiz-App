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
exports.me = void 0;
const teacher_1 = __importDefault(require("../../../model/teacher"));
const utils_1 = require("../../utils");
const me = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    let id = utils_1.getUserId(ctx);
    let requiredUser;
    try {
        requiredUser = teacher_1.default.findById(id);
    }
    catch (e) {
        throw new Error(e);
    }
    return requiredUser;
});
exports.me = me;
//# sourceMappingURL=teacher.js.map
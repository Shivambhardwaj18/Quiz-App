"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const subjectSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
});
const Subject = mongoose_1.default.model("Subject", subjectSchema);
exports.default = Subject;
//# sourceMappingURL=subject.js.map
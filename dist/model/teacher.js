"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const teacherSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    subjects: [
        {
            type: mongoose_1.default.Types.ObjectId,
            required: false,
            ref: "Subject",
        },
    ],
});
const Teacher = mongoose_1.default.model("Teacher", teacherSchema);
exports.default = Teacher;
//# sourceMappingURL=teacher.js.map
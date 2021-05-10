"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const questionSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    options: [
        {
            type: String,
            ref: "Question",
        },
    ],
});
const Question = mongoose_1.default.model("Question", questionSchema);
exports.default = Question;
//# sourceMappingURL=Question.js.map
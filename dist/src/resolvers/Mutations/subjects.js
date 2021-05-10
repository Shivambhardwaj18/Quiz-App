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
exports.addSubject = void 0;
const subject_1 = __importDefault(require("../../../model/subject"));
const teacher_1 = __importDefault(require("../../../model/teacher"));
const utils_1 = require("../../utils");
const addSubject = (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
    let id = utils_1.getUserId(ctx);
    let requiredTeacher, newSubject, subjectNameTakn;
    console.log(id);
    try {
        requiredTeacher = yield teacher_1.default.findById(id);
    }
    catch (e) {
        throw new Error(e);
    }
    try {
        subjectNameTakn = yield subject_1.default.findOne({
            name: args.name,
            teacher: requiredTeacher._id,
        });
    }
    catch (e) {
        throw new Error(e);
    }
    console.log(args.name, requiredTeacher._id, subjectNameTakn);
    if (subjectNameTakn) {
        throw new Error("Subjct already exists");
    }
    try {
        newSubject = yield subject_1.default.create(Object.assign(Object.assign({}, args), { teacher: requiredTeacher }));
        yield teacher_1.default.findOneAndUpdate({ _id: id }, {
            $push: { subjects: newSubject },
        });
    }
    catch (e) {
        throw new Error(e);
    }
    return newSubject;
});
exports.addSubject = addSubject;
//# sourceMappingURL=subjects.js.map
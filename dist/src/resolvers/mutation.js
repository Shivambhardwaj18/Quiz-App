"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const teacher_1 = require("./Mutations/teacher");
const subjects_1 = require("./Mutations/subjects");
const Mutation = {
    signup: teacher_1.signup,
    login: teacher_1.login,
    addSubject: subjects_1.addSubject,
};
exports.default = Mutation;
//# sourceMappingURL=mutation.js.map
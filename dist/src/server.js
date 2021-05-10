"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const graphql_yoga_1 = require("graphql-yoga");
const chalk_1 = __importDefault(require("chalk"));
const mongoose_1 = __importDefault(require("mongoose"));
const mutation_1 = __importDefault(require("./resolvers/mutation"));
const query_1 = __importDefault(require("./resolvers/query"));
const teacher_1 = __importDefault(require("./resolvers/Mutations/childMutations/teacher"));
const subject_1 = __importDefault(require("./resolvers/Mutations/childMutations/subject"));
dotenv_1.default.config();
const server = new graphql_yoga_1.GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers: {
        Query: query_1.default,
        Mutation: mutation_1.default,
        Teacher: teacher_1.default,
        Subject: subject_1.default
    },
    context: (request) => {
        return Object.assign({}, request);
    },
});
server.start({ port: process.env.PORT }, () => {
    try {
        mongoose_1.default.connect(process.env.MONGO_DB_URL, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useNewUrlParser: true,
        });
        console.log(chalk_1.default.hex("#fab95b").bold(`The Server is Up ${process.env.PORT}`));
    }
    catch (e) {
        console.log(e);
    }
});
//# sourceMappingURL=server.js.map
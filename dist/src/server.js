"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const chalk_1 = __importDefault(require("chalk"));
const server = new graphql_yoga_1.GraphQLServer({
    typeDefs: "./src/schema/schema.graphql",
});
server.start(() => {
    console.log(chalk_1.default.green("The Server is Up"));
});
//# sourceMappingURL=server.js.map
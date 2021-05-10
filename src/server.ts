import dotenv from "dotenv";
import { GraphQLServer } from "graphql-yoga";
import Chalk from "chalk";
import mongoose from "mongoose";
import Mutation from "./resolvers/mutation";
import Query from "./resolvers/query";
import Teacher from "./resolvers/Mutations/childMutations/teacher"
import Subject from "./resolvers/Mutations/childMutations/subject"

dotenv.config();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Teacher,
    Subject
  },
  context: (request) => {
    return {
      ...request,
    };
  },
});

server.start({ port: process.env.PORT }, () => {
  try {
    mongoose.connect(process.env.MONGO_DB_URL, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useNewUrlParser: true,
    });
    console.log(
      Chalk.hex("#fab95b").bold(`The Server is Up ${process.env.PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
});

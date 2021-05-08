import dotenv from "dotenv";
import { GraphQLServer } from "graphql-yoga";
import Chalk from "chalk";
import mongoose from "mongoose";
import Mutation from "./resolvers/mutation";

dotenv.config();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Mutation,
  },
});

server.start({ port: process.env.PORT }, () => {
  try {
    mongoose.connect(process.env.MONGO_DB_URL);
    console.log(
      Chalk.hex("#fab95b").bold(`The Server is Up ${process.env.PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
});

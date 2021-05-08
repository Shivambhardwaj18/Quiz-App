require("dotenv").config();

const { ApolloServer } = require("apollo-server-express");
const chalk = require("chalk");
const cors = require("cors");
const express = require("express");
const path = require("path");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const http = require("http");
const database = require("../db");

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 50000,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const app = express();

app.use(apiLimiter);
app.use(xss());
app.use(
  helmet({
    contentSecurityPolicy:
      process.env.NODE_ENV === "production" ? undefined : false,
  })
);
app.use(mongoSanitize());
app.use(cors());

app.get("/", (req, res) =>
  res.json({ "talawa-version": "v1", status: "healthy" })
);

const httpServer = http.createServer(app);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res, connection }) => {
    if (connection) {
      return { ...connection, res, req };
    } else {
      return { res, req };
    }
  },
});

apolloServer.applyMiddleware({ app });
apolloServer.installSubscriptionHandlers(httpServer);

database
  .connect()
  .then(() => {
    httpServer.listen(process.env.PORT || 4000, () => {
      console.log(
        chalk
          .hex("#fab95b")
          .bold(
            `🚀 Server ready at http://localhost:${process.env.PORT || 4000}${
              apolloServer.graphqlPath
            }`
          )
      );
    });
  })
  .catch((e) => console.log(chalk.red(e)));

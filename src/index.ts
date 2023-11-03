import express, { Express, Request, Response } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http, { Server } from "http";
import dotenv from "dotenv";
import resolvers from "./resolvers/resolver.js";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import cors from "cors";
import bodyParser from "body-parser";
import SecurityService from "./security/SecurityService.js";
import { GraphQLError } from "graphql";

const typeDefs = loadSchemaSync("./**/*.graphql", {
  loaders: [new GraphQLFileLoader()],
});

dotenv.config();

const app: Express = express();

const httpServer: Server = http.createServer(app);
const port = process.env.port ?? 3000;

interface MyContext {
  authorization?: string;
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

const handler = (req: Request, res: Response) => {
  res.send("Server is up");
};

app.get("/", handler);
app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      let token: string;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
      ) {
        let data = req.headers.authorization.split(" ");
        token = data[1];
      } else {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
      const validToken =
        await SecurityService.getInstance().validateTokenOffline(token);
      if (validToken) {
        return { authorization: req.headers.authorization };
      } else {
        throw new GraphQLError("User is not authenticated", {
          extensions: {
            code: "UNAUTHENTICATED",
            http: { status: 401 },
          },
        });
      }
    },
  })
);

await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
console.log(`⚡️[server]: Server is running at http://localhost:${port}`);

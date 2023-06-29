import { ApolloServer } from "@apollo/server";
import { PrismaClient } from "@prisma/client";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import { makeExecutableSchema } from "@graphql-tools/schema";
import express from "express";
import http from "http";
import cors from "cors";
import { json } from "body-parser";
import { getSession } from "next-auth/react";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import * as dotenv from "dotenv";
import { GraphQLContext, Session } from "./utils/types";

const main = async () => {
  dotenv.config();

  const app = express();
  const httpServer = http.createServer(app);
  const prisma = new PrismaClient();
  const server = new ApolloServer({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: [process.env.CLIENT_ORIGIN as string],
      credentials: true,
    }),
    json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<GraphQLContext> => {
        const session = (await getSession({ req })) as Session;
        return { session, prisma };
      },
    })
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
};

main().catch((e) => console.log(e));

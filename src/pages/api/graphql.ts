import { resolvers } from "@/graphql/resolvers";
import { schema } from "@/graphql/schema";
import { createContext } from "@/lib/context";
import { ApolloServer } from "apollo-server-micro";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { IncomingMessage, ServerResponse } from "http";
import Cors from "micro-cors";

const cors = Cors();
const apolloServer = new ApolloServer({
  schema,
  resolvers,
  context: createContext,
});

const startServer = apolloServer.start();

export default cors(async function handler(
  req: MicroRequest,
  res: ServerResponse<IncomingMessage>
) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};

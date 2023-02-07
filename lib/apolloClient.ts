import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import crossFetch from "cross-fetch";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://myapp.com"
    : "http://localhost:3001";

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${BASE_URL}/api/graphql`,
    credentials: "same-origin",
    fetch: crossFetch,
  }),
  ssrMode: typeof window === "undefined",
});

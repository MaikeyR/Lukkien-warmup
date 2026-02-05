import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";


export const client = new ApolloClient({
  link: new HttpLink({ uri: "https://localhost:8000/graphql/" }),
  cache: new InMemoryCache(),
});

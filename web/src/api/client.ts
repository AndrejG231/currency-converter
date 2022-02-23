import { ApolloClient, InMemoryCache } from "@apollo/client"

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: process.env.CLIENT_URI!,
  cache,
})

export { client }

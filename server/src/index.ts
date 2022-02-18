import "reflect-metadata"
import express from "express"
import { ApolloServer, gql } from "apollo-server-express"
import { validateEnvs } from "./utils/validate_envs"

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`

async function main() {
  console.log("Launching server...")

  validateEnvs()

  const app = express()

  const server = new ApolloServer({
    typeDefs,
  })

  await server.start()

  server.applyMiddleware({ app })

  app.listen({ port: ~~process.env.PORT! }, () =>
    console.log("Server ready at ", process.env.PORT)
  )
}

main()

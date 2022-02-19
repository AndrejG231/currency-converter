import "reflect-metadata"
import express from "express"
import { ApolloServer, gql } from "apollo-server-express"
import { validateEnvs } from "src/utils/validate_envs"
import { initConverterService } from "src/services/currency_converter"
import { initMongoStore } from "src/services/mongo_store"
import { Context } from "src/types/context"
import { models } from "src/models"

if (process.env.MODE === "dev") {
  require("dotenv").config()
}

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

  const converter = await initConverterService()
  const store = await initMongoStore()

  const app = express()

  const server = new ApolloServer({
    typeDefs,
    context: ({ req, res }): Context => ({
      req,
      res,
      services: {
        store,
        converter,
      },
      models,
    }),
  })

  await server.start()

  server.applyMiddleware({ app })

  app.listen({ port: ~~process.env.PORT }, () =>
    console.log("Server ready at ", process.env.PORT)
  )
}

main()

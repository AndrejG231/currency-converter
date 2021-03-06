import "reflect-metadata"
import { ApolloServer } from "apollo-server-express"
import express from "express"
import { buildSchema } from "type-graphql"
import { models } from "./models"
import { initMongoStore } from "./services/mongo_store"
import { validateEnvs } from "./utils/validate_envs"
import { initConverterService } from "./services/currency_converter/service"
import { Context } from "./types/context"
import { ConvertResolver } from "./resolvers/convert"
import { StatisticsResolver } from "./resolvers/statistics"

if (process.env.MODE === "dev") {
  require("dotenv").config()
}

async function main() {
  console.log("Launching server...")

  validateEnvs()

  const schema = await buildSchema({
    resolvers: [ConvertResolver, StatisticsResolver],
  })

  const converter = await initConverterService()
  const store = await initMongoStore()

  const app = express()

  const server = new ApolloServer({
    schema,
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

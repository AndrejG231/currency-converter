import { Ctx, Query, Resolver } from "type-graphql"
import { StatisicsResponse } from "src/typedefs/response_statistics"
import { Context } from "src/types/context"
import { ApolloError } from "apollo-server-express"

@Resolver()
class StatisticsResolver {
  @Query(() => StatisicsResponse)
  async statistics(
    @Ctx() { models, services }: Context
  ): Promise<StatisicsResponse> {
    // Select mostPopular, totalCount of entries, total amount transferred
    const [stats] = await models.Conversions.aggregate([
      {
        $group: {
          _id: "$destination",
          amount: {
            $sum: "$amount",
          },
          count: {
            $count: {},
          },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $group: {
          _id: "statistics",
          mostPopular: { $first: "$_id" },
          count: { $sum: "$count" },
          amount: { $sum: "$amount" },
        },
      },
    ]).exec()

    if (!stats?._id) {
      throw new ApolloError(
        "Could not retrieve statistics.",
        "INTERNAL_SERVER_ERROR"
      )
    }

    return {
      mostPopularDestination: {
        name: services.converter.allowedCurrencies[stats.mostPopular],
        symbol: stats.mostPopular,
      },
      totalAmountConverted: stats.amount,
      totalConversionsCount: stats.count,
    }
  }
}

export { StatisticsResolver }

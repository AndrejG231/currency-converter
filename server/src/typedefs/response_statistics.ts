import { Field, Int, ObjectType } from "type-graphql"
import { Currency } from "./currency"

@ObjectType()
class StatisicsResponse {
  @Field(() => Currency)
  mostPopularDestination: Currency

  @Field()
  totalAmountConverted: number

  @Field(() => Int)
  totalConversionsCount: number
}

export { StatisicsResponse }

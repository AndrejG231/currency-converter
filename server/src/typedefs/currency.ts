import { Field, ObjectType } from "type-graphql"

@ObjectType()
class Currency {
  @Field()
  name: string

  @Field()
  symbol: string
}

export { Currency }

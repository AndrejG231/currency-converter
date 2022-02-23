import { Field, ObjectType } from "type-graphql"

@ObjectType()
class ConversionResponse {
  @Field()
  value: number

  @Field()
  source: string

  @Field()
  destination: string
}

export { ConversionResponse }

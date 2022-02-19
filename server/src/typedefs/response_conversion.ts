import { Field, ObjectType } from "type-graphql"

@ObjectType()
class ConversionResponse {
  @Field()
  value: number
}

export { ConversionResponse }

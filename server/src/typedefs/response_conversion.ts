import { Field, ObjectType } from "type-graphql"

@ObjectType()
class ConversionResponse {
  @Field()
  inputValue: number

  @Field()
  value: number

  @Field()
  source: string

  @Field()
  destination: string
}

export { ConversionResponse }

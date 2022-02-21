import { Arg, Ctx, Query, Resolver } from "type-graphql"
import { Context } from "../types/context"
import { ConversionResponse } from "../typedefs/response_conversion"
import { InvalidCurrencyError } from "../typedefs/error_invalid_currency"

@Resolver()
class ConvertResolver {
  @Query(() => ConversionResponse)
  async conver(
    @Arg("from") from: string,
    @Arg("to") to: string,
    @Arg("amount") amount: number,
    @Ctx() { models, services }: Context
  ) {
    // Check correct currency
    if (!services.converter.isValidCurrency(from))
      throw new InvalidCurrencyError("from", from)
    if (!services.converter.isValidCurrency(to))
      throw new InvalidCurrencyError("to", to)

    const result = services.converter.convert(from, to, amount)

    // Store conversions history in database
    new models.Conversions({
      from,
      to,
      amount,
    }).save()

    return { value: result }
  }
}

export { ConvertResolver }

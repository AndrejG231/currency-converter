import { Arg, Ctx, Query, Resolver } from "type-graphql"
import { Context } from "../types/context"
import { ConversionResponse } from "../typedefs/response_conversion"
import { InvalidCurrencyError } from "../typedefs/error_invalid_currency"
import { ExternalConversionError } from "../typedefs/error_external_conversion"

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

    const result = await services.converter.convert(from, to, amount)

    if (!result.success) {
      throw new ExternalConversionError(result.error)
    }

    // Store conversions history in database
    new models.Conversions({
      from,
      to,
      amount,
    }).save()

    return { value: result.value }
  }
}

export { ConvertResolver }

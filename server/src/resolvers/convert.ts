import { Arg, Ctx, Query, Resolver } from "type-graphql"
import { Context } from "../types/context"
import { ConversionResponse } from "../typedefs/response_conversion"
import { InvalidCurrencyError } from "../typedefs/error_invalid_currency"
import { Currency } from "../typedefs/currency"

@Resolver()
class ConvertResolver {
  @Query(() => [Currency])
  availableCurrencies(@Ctx() { services }: Context): Currency[] {
    return Object.entries(services.converter.allowedCurrencies).map(
      ([name, symbol]) => ({
        name,
        symbol,
      })
    )
  }

  @Query(() => ConversionResponse)
  async conver(
    @Arg("source") source: string,
    @Arg("destination") destination: string,
    @Arg("amount") amount: number,
    @Ctx() { models, services }: Context
  ): Promise<ConversionResponse> {
    // Check correct currency
    if (!services.converter.isValidCurrency(source))
      throw new InvalidCurrencyError("source", source)
    if (!services.converter.isValidCurrency(destination))
      throw new InvalidCurrencyError("destination", destination)

    const result = await services.converter.convert(source, destination, amount)

    // Store conversions history in database
    new models.Conversions({
      source,
      destination,
      amount,
    }).save()

    return { value: result, source, destination }
  }
}

export { ConvertResolver }

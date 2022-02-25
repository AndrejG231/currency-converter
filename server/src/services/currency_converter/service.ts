import { DAY } from "src/constants/time"
import { ConversionResponse } from "."
import { Api } from "./api"
import { ExchangeRate as ExchangeRateType, ExchangeRates } from "./types"

/**
 * Holds information about cached exchange rate
 */
class ExchangeRate implements ExchangeRateType {
  rate: number
  validUntil: number

  constructor(data: { rate: number; timestamp: number }) {
    this.rate = data.rate
    this.validUntil = data.timestamp + DAY
  }

  get isValid(): boolean {
    return new Date().getTime() <= this.validUntil
  }

  convert(value: number): number {
    return value * this.rate
  }
}

/**
 * Currency converter service
 * - holds local data of conversion rates
 * - periodically updates local data
 * - handles conversions
 */
export class ConverterService {
  api: Api
  allowedCurrencies: Record<string, string>
  exchangeRates: ExchangeRates

  constructor(api: Api, allowedCurrencies: Record<string, string>) {
    this.api = api
    this.allowedCurrencies = allowedCurrencies
    this.exchangeRates = {}
  }

  async convert(
    from: string,
    to: string,
    value: number
  ): Promise<ConversionResponse> {
    const currentExchangeRate = this.exchangeRates[from]?.[to]

    // check if there is currently valid cached exchange rate and use it
    if (currentExchangeRate?.isValid) {
      return { success: true, value: currentExchangeRate.convert(value) }
    }

    // Invalid cached exchange rate - fetch and store new

    const newExchangeRateData = await this.api.live(from, [to])

    // Return error response in case of failed to fetch new data
    if (!newExchangeRateData.success) return newExchangeRateData

    // Case of successful api response with wrong values?
    if (!newExchangeRateData.quotes[from + to])
      return {
        success: false,
        error: {
          code: 500,
          info: "Received invalid conversion data from conversion server.",
        },
      }

    // Cache new exchange rate
    const newExchangeRate = new ExchangeRate({
      rate: newExchangeRateData.quotes[from + to],
      timestamp: newExchangeRateData.timestamp,
    })
    this.exchangeRates[from] = {
      ...this.exchangeRates[from],
      [to]: newExchangeRate,
    }

    return { success: true, value: newExchangeRate.convert(value) }
  }

  isValidCurrency(currency: string): boolean {
    return !!this.allowedCurrencies[currency]
  }
}

/**
 * Initialize currency converter service
 */
const initConverterService = async () => {
  const api = new Api()

  // Fetch initial available currencies
  const initialData = await api.list()

  if (!initialData.success)
    throw new Error(`Failed to fetch initial data:\n", ${initialData}, \n`)

  const converter = new ConverterService(api, initialData.currencies)

  return converter
}

export { initConverterService }

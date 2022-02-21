import { LiveRates, LiveRatesResponse } from "."
import { timeoutAsync } from "../../utils/timeout_async"
import { Api } from "./api"
import { UPDATE_FREQUENCY } from "./constants"

/**
 * Currency converter service
 * - holds local data of conversion rates
 * - periodically updates local data
 * - handles conversions
 */
export class ConverterService {
  api: Api
  allowedCurrencies: Record<string, string>
  exchangeRates: Record<string, number> = {}
  validTo: number
  loading: boolean
  incomingRates: Promise<LiveRatesResponse>

  constructor(api: Api) {
    this.api = api
  }

  get isValid(): boolean {
    return this.validTo >= new Date().getTime()
  }

  /**
   *  Used to load exchange and allowed currencies into cache
   *  Exchange rates should be valid for update frequency
   *  Errors on initializing should prevent server from running
   *  Errors on updates (expired rates) should be ignored - use old data
   */
  async loadExchangeRates() {
    this.loading = true
    this.incomingRates = this.api.live()
    const response = await this.incomingRates
    this.loading = false

    if (response.success) {
      this.exchangeRates = Object.entries(response.quotes).reduce(
        (acc, [key, val]) => ({
          ...acc,
          [key.slice(3)]: val,
        }),
        {} as Record<string, number>
      )

      // When to refetch new exchange rates
      this.validTo = new Date().getTime() + UPDATE_FREQUENCY

      return true
    }

    return false
  }

  /**
   * Load allowed currencies
   * Currently used only on initializing
   */
  async loadAllowedCurrencies(): Promise<boolean> {
    const response = await this.api.list()
    if (!response.success) {
      return false
    }

    this.allowedCurrencies = response.currencies

    return true
  }

  /**
   * Returns exchange rate between two currencies
   * Since free api does not support base currency, will be calculated from USD exchange rates
   * Reloads exchange rates after update
   */
  async getExchangeRate(from: string, to: string): Promise<number> {
    if (!this.isValidCurrency(from) || !this.isValidCurrency(to))
      throw new Error(`Requested exchange rate for invalid currency.`)

    if (!this.loading && !this.isValid) {
      this.loadExchangeRates()
    }

    await this.incomingRates

    return this.exchangeRates[to] / this.exchangeRates[from]
  }

  async convert(from: string, to: string, value: number): Promise<number> {
    const rate = await this.getExchangeRate(from, to)
    return rate * value
  }

  isValidCurrency(currency: string): boolean {
    return !!this.allowedCurrencies[currency]
  }
}

/**
 * Initialize currency converter service
 */
const initConverterService = async () => {
  let success: boolean
  const api = new Api()
  const converter = new ConverterService(api)

  // Fetch initial data
  success = await converter.loadAllowedCurrencies()
  await timeoutAsync(2000) // free-tier API has rate limits for consecutive calls
  success = await converter.loadExchangeRates()

  if (!success) throw new Error(`Failed to initialize conversion service.`)

  return converter
}

export { initConverterService }

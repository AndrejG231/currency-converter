import { MockApi } from "./__fixtures__/mock-api"
import allowedCurrencies from "./__fixtures__/snapshot-allowed_currencies.json"
import exchangeRates from "./__fixtures__/snapshot-exchange_rates.json"
import { ConverterService } from "../service"
import { timeoutAsync } from "../../../utils/timeout_async"

let converter: ConverterService
let api: any

beforeEach(async () => {
  api = new MockApi()
  converter = new ConverterService(api as any)
  await converter.loadAllowedCurrencies()
  await converter.loadExchangeRates()
})

describe("Testing currency converter service", () => {
  test("Should have allowed currencies and exchange rates", () => {
    expect(converter.allowedCurrencies).toMatchObject(allowedCurrencies)
    expect(converter.exchangeRates).toMatchObject(exchangeRates)
  })

  test("Should convert values.", async () => {
    const results: any = []
    results.push(await converter.convert("USD", "EUR", 10))
    results.push(await converter.convert("CZK", "KZT", 0))
    results.push(await converter.convert("TMT", "TND", 1))
    results.push(await converter.convert("USD", "EUR", 0.00002))
    results.push(await converter.convert("USD", "EUR", 9999999999))
    results.push(await converter.convert("USD", "EUR", -1)) // should transfter negative?

    expect(results).toMatchObject([
      8.84905, 0, 0.8225051282051282, 0.000017698100000000003,
      8849049999.115095, -0.884905,
    ])
  })

  test("Should keep working without api", async () => {
    api.live = jest.fn(() => ({}))
    converter.validTo = 0

    const result = await converter.convert("USD", "EUR", 10)
    expect(result).toEqual(8.84905)
  })

  test("Should update exchange rates from api", async () => {
    converter.validTo = 0
    converter.exchangeRates = {}

    const result = await converter.convert("USD", "EUR", 10)

    expect(converter.exchangeRates).toMatchObject(exchangeRates)
    expect(result).toEqual(8.84905)
    expect(api.live).toBeCalledTimes(2)
  })

  test("Should not call api to update multiple times", async () => {
    // Invalidate current
    converter.validTo = 0
    converter.exchangeRates = {}

    // Spam convert when outdate rates
    for (let i = 0; i < 100; i++) {
      converter.convert("USD", "EUR", 10)
    }

    expect(converter.validTo).toEqual(0)
    expect(converter.exchangeRates).toMatchObject({})

    await converter.convert("USD", "EUR", 10)

    expect(converter.validTo).toBeGreaterThanOrEqual(1)
    expect(converter.exchangeRates).toMatchObject(exchangeRates)
    expect(api.live).toBeCalledTimes(2)
  })
})

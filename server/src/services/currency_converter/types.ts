export type Response<ResponseType> =
  | ({ success: false } & Error)
  | ({ success: true } & ResponseType)

export type Error = {
  error: {
    code: number
    info: string
  }
}

// get /list
export type AvailableCurrencies = {
  terms: string
  privacy: string
  currencies: Record<string, string>
}

// get /live
export type LiveRates = {
  terms: string
  privacy: string
  timestamp: number
  source: string
  quotes: Record<string, number>
}

export type AvailableCurrenciesResponse = Response<AvailableCurrencies>
export type LiveRatesResponse = Response<LiveRates>

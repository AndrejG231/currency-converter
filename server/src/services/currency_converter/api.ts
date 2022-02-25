import axios, { AxiosInstance } from "axios"
import { AvailableCurrenciesResponse, LiveRatesResponse } from "."
import { ENDPOINT } from "./constants"

/* Api client providing raw api calls */

class Api {
  instance: AxiosInstance

  // Main endpoint instance
  constructor() {
    const instance = axios.create({
      baseURL: ENDPOINT,
      params: { access_key: process.env.CONVERSION_ACCESS_KEY },
    })

    instance.interceptors.response.use(
      (res) => ({
        data: res.data,
      }),
      (error) => {
        // Secure same response format for every error

        const response = error.response ?? {}

        const { status = 500, statusText = "Unknown error occured." } = response

        return {
          data: { success: false, error: { code: status, info: statusText } },
        }
      }
    )

    this.instance = instance
  }

  /**
   *  List all available currencies
   */
  async list(): Promise<AvailableCurrenciesResponse> {
    const { data } = await this.instance({ method: "GET", url: "/list" })
    return data
  }

  /**
   * Live rates for specific currency
   */
  async live(
    source: string,
    currencies: string[] = []
  ): Promise<LiveRatesResponse> {
    const { data } = await this.instance({
      method: "GET",
      url: "/live",
      params: { source, currencies: currencies.join(",") },
    })

    return data
  }
}

const api = new Api()

export { Api, api }

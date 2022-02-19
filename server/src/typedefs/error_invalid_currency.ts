import { ApolloError } from "apollo-server-errors"

class InvalidCurrencyError extends ApolloError {
  constructor(field: string, value: string) {
    super(`Invalid value "${value}" for field "${field}".`, "INVALID_CURRENCY")
  }
}

export { InvalidCurrencyError }

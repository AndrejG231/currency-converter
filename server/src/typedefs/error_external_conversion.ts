import { ApolloError } from "apollo-server-errors"

class ExternalConversionError extends ApolloError {
  constructor(error: { code: number; info: string }) {
    super("Failed to convert values", "EXTERNAL_CONVERSION")
    this.externalCode = error.code
    this.externalInfo = error.info
  }
}

export { ExternalConversionError }

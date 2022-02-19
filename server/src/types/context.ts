import mongoose from "mongoose"
import { Request, Response } from "express"
import { ConverterService } from "src/services/currency_converter/service"
import { Models } from "src/models"

export type Context = {
  req: Request
  res: Response
  services: {
    store: typeof mongoose
    converter: ConverterService
  }
  models: Models
}

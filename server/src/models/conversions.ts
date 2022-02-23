import { Schema, model } from "mongoose"

type ConversionsType = {
  source: string
  destination: string
  amount: number
  createdAt: Date
  updatedAt: Date
}

const ConversionSchema = new Schema<ConversionsType>(
  {
    amount: { type: Number, required: true },
    source: { type: String, required: true },
    destination: { type: String, required: true },
  },
  { timestamps: true }
)

const Conversions = model<ConversionsType>("Conversion", ConversionSchema)

export { Conversions }

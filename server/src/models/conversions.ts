import { Schema, model } from "mongoose"

type ConversionsType = {
  from: string
  to: string
  amount: number
}

const ConversionSchema = new Schema<ConversionsType>(
  {
    amount: { type: Number, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
  },
  { timestamps: true }
)

const Conversions = model<ConversionsType>("Conversion", ConversionSchema)

export { Conversions }

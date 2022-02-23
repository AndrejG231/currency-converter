/**
 * Formats conversion data into displayed result string
 */

export const formatConversion = (data?: {
  inputValue: number
  value: number
  source: string
  destination: string
}) => {
  if (!data) return

  return `${data.inputValue.toFixed(2)} ${data.source} = ${data.value.toFixed(
    2
  )} ${data.destination}`
}

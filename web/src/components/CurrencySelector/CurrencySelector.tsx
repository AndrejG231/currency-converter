import { useTheme } from "styled-components"
import Select from "react-select"
import { selectStyles, Wrapper } from "./styles"
import { SelectType } from "./types"

/**
 * Handles selection of dropdown component
 */
type Props = {
  options: { name: string; symbol: string }[]
  setValue: (s: string | null) => void
  type: SelectType
}

const CurrencySelector = ({ setValue, options, type }: Props) => {
  const theme = useTheme()
  return (
    <Wrapper type={type}>
      <Select
        isSearchable
        options={options.map((option) => ({
          label: option.name,
          value: option.symbol,
        }))}
        onChange={(option) => setValue(option?.value ?? null)}
        placeholder={`Select ${type} currency.`}
        styles={selectStyles(theme)}
      />
    </Wrapper>
  )
}

export { CurrencySelector }

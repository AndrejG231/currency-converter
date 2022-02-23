import { useApolloClient } from "@apollo/client"
import { ChangeEventHandler, useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import {
  useAvailableCurrenciesQuery,
  useConvertLazyQuery,
} from "../../api/generated"
import { Button } from "../../components/Button"
import { CurrencySelector } from "../../components/CurrencySelector/CurrencySelector"
import { Fallback } from "../../components/Fallback"
import { Input } from "../../components/Input"
import { Title } from "../../components/Title"
import { useAutoHide } from "../../hooks/autoHide"
import { Layout } from "./styles"
import { formatConversion } from "./util"

const Convert = () => {
  const client = useApolloClient()
  const availableCurrenciesQuery = useAvailableCurrenciesQuery()
  const [convert, conversionResult] = useConvertLazyQuery({
    onCompleted: () => client.resetStore(),
  })

  const [source, setSource] = useState<string | null>(null)
  const [destination, setDestination] = useState<string | null>(null)
  const [amount, setAmount] = useState(0)

  const autoHide = useAutoHide("")

  /**
   * Input value change
   */
  const handleChangeAmount: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = ~~event.target.value
    if (value) {
      return setAmount(value)
    }

    setAmount(0)
  }

  /**
   * Validate data and query server for conversion
   */
  const handleConvert = useCallback(() => {
    if (!source) return autoHide.show("Missing source currency!", 4000)
    if (!destination)
      return autoHide.show("Missing destination currency!", 4000)

    convert({ variables: { amount, destination, source } })
  }, [amount, destination, source])

  /**
   * Show message on errors
   */
  useEffect(() => {
    if (conversionResult.error) {
      // show error message for 4seconds
      autoHide.show("Could not convert specified value", 4000)
    }
    if (conversionResult.data) {
      // clear error message after good conversion
      autoHide.hide()
    }
  }, [autoHide, conversionResult.error, conversionResult.data])

  if (availableCurrenciesQuery.loading) return <Fallback>Loading...</Fallback>

  if (availableCurrenciesQuery.error || !availableCurrenciesQuery.data)
    return <Fallback>Could not load available currencies.</Fallback>

  const { availableCurrencies } = availableCurrenciesQuery.data

  return (
    <Layout>
      <CurrencySelector
        setValue={setSource}
        options={availableCurrencies}
        type="source"
      />
      <CurrencySelector
        setValue={setDestination}
        options={availableCurrencies}
        type="destination"
      />
      {/* Amount input */}
      <Input
        type="number"
        placeholder="Enter amount"
        gridArea={"input"}
        onChange={handleChangeAmount}
        onKeyDown={({ key }) => key === "Enter" && handleConvert()}
      />
      {/* Error message or conversion result */}
      <Title area={"result"}>
        {autoHide.value || formatConversion(conversionResult.data?.convert)}
      </Title>
      <Button gridArea="confirm" onClick={handleConvert}>
        Convert!
      </Button>
    </Layout>
  )
}

export { Convert }

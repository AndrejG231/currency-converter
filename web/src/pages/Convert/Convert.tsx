import { ChangeEventHandler, useState } from "react"
import styled from "styled-components"
import { Button } from "../../components/Button"
import { CurrencySelector } from "../../components/CurrencySelector/CurrencySelector"
import { Input } from "../../components/Input"
import { Title } from "../../components/Title"
import { Layout } from "./styles"

const Convert = () => {
  const [source, setSource] = useState<string | null>(null)
  const [destination, setDestination] = useState<string | null>(null)
  const [amount, setAmount] = useState(0)

  const handleChangeAmount: ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = ~~event.target.value
    if (value) {
      return setAmount(value)
    }

    setAmount(0)
  }

  return (
    <Layout>
      <CurrencySelector
        setValue={setSource}
        options={new Array(100).fill("a").map((item) => ({
          name: (Math.random() * 1000).toFixed(),
          symbol: (Math.random() * 1000).toFixed(),
        }))}
        type="source"
      />
      <CurrencySelector
        setValue={setSource}
        options={new Array(100).fill("a").map((item) => ({
          name: (Math.random() * 1000).toFixed(),
          symbol: (Math.random() * 1000).toFixed(),
        }))}
        type="destination"
      />
      <Title area={"result"}>{amount} USD = 10 EUR</Title>
      <Input
        type="number"
        placeholder="Enter amount"
        gridArea={"input"}
        onChange={handleChangeAmount}
      />
      <Button gridArea="confirm">Convert!</Button>
    </Layout>
  )
}

export { Convert }

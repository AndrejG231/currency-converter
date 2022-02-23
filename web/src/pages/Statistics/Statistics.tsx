import styled from "styled-components"
import { Title } from "../../components/Title"
import { Layuot, Stat, StatInfo } from "./styles"

const Statistics = () => {
  const name = "American dollar"
  const count = 204
  const amount = 10

  return (
    <Layuot>
      <Stat>
        <Title>{name}</Title>
        <StatInfo>most popular destination currency.</StatInfo>
      </Stat>
      <Stat>
        <Title>{count}</Title>
        <StatInfo>number of conversions made.</StatInfo>
      </Stat>
      <Stat>
        <Title>${amount.toFixed(2)}</Title>
        <StatInfo>amount of money converted.</StatInfo>
      </Stat>
    </Layuot>
  )
}

export { Statistics }

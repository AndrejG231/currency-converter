import styled from "styled-components"
import { Title } from "../components/Title"

const Layuot = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`

const Stat = styled.span`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`

const Statistics = () => {
  const name = "American dollar"
  const count = 204
  const amount = 10

  return (
    <Layuot>
      <Stat>
        <Title>{name}</Title>
        most popular destination currency.
      </Stat>
      <Stat>
        <Title>{count}</Title>
        number of conversions made.
      </Stat>
      <Stat>
        <Title>${amount.toFixed(2)}</Title>
        amount of money converted.
      </Stat>
    </Layuot>
  )
}

export { Statistics }

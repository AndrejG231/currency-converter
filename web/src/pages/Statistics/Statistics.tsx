import { Title } from "../../components/Title"
import { Layuot, Stat, StatInfo } from "./styles"
import { useStatisticsQuery } from "../../api/generated"
import { Fallback } from "../../components/Fallback"

const Statistics = () => {
  const { data, loading, error } = useStatisticsQuery()

  if (loading) {
    return <Fallback>Loading...</Fallback>
  }

  if (error || !data) {
    return <Fallback>Could not load stats.</Fallback>
  }

  const {
    mostPopularDestination,
    totalAmountConverted,
    totalConversionsCount,
  } = data.statistics

  return (
    <Layuot>
      <Stat>
        <Title>{mostPopularDestination.name}</Title>
        <StatInfo>most popular destination currency.</StatInfo>
      </Stat>
      <Stat>
        <Title>{totalConversionsCount}</Title>
        <StatInfo>number of conversions made.</StatInfo>
      </Stat>
      <Stat>
        <Title>${totalAmountConverted.toFixed(2)}</Title>
        <StatInfo>amount of money converted.</StatInfo>
      </Stat>
    </Layuot>
  )
}

export { Statistics }

import styled from "styled-components"

export const Layuot = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`

export const Stat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const StatInfo = styled.span`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`

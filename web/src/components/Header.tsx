import { FC } from "react"
import styled from "styled-components"

const HeaderBox = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
`

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
`

const Header: FC = ({ children }) => {
  return (
    <HeaderBox>
      <Title>{children}</Title>
    </HeaderBox>
  )
}

export { Header }

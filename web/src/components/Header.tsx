import { FC } from "react"
import styled from "styled-components"
import { Title } from "./Title"

const HeaderBox = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
`

const Header: FC = ({ children }) => {
  return (
    <HeaderBox>
      <Title as="h1">{children}</Title>
    </HeaderBox>
  )
}

export { Header }

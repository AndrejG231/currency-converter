import { FC } from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FallbackText = styled.span`
  display: block;
  color: ${({ theme }) => theme.colors.white};
  font-size: 2rem;
`

const Fallback: FC = ({ children }) => {
  return (
    <Wrapper>
      <FallbackText>{children}</FallbackText>
    </Wrapper>
  )
}

export { Fallback }

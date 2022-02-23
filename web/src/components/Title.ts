import styled, { css } from "styled-components"

type Props = {
  area?: string
}

const Title = styled.span<Props>`
  display: block;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  ${({ area }) => area && `grid-area: ${area}`};
  font-size: 2.8rem;
  width: 100%;
`

export { Title }

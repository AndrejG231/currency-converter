import styled from "styled-components"

type Props = {
  gridArea?: string
  minWidth?: number
}

const Input = styled.input<Props>`
  height: 100%;
  background: ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.2rem;
  ${({ gridArea }) => gridArea && `grid-area: ${gridArea};`};
  ${({ minWidth }) => minWidth && `min-width: ${minWidth};`};
  text-align: center;
  border-radius: 4px;
`

export { Input }

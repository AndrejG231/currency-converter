import styled from "styled-components"

type Props = {
  gridArea?: string
  isSelected?: boolean
}

const Button = styled.button<Props>`
  background: ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.white};
  height: 100%;
  font-size: 1.2rem;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.bgSecondary};
  }
  ${({ gridArea }) => gridArea && `grid-area: ${gridArea}`};
  ${({ isSelected }) => isSelected && `text-decoration: underline`};
`

export { Button }

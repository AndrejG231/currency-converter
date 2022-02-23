import { useNavigate, useLocation } from "react-router-dom"
import styled, { css } from "styled-components"
import { Route } from "../types/route"

const Bar = styled.nav`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 50px;
  background: ${({ theme }) => theme.colors.gray};
  display: flex;
  align-items: center;
  justify-content: center;
`

type ButtonProps = { isSelected: boolean }

const Button = styled.button.attrs<ButtonProps>(({ isSelected }) => ({
  className: isSelected ? "selected" : "",
}))<ButtonProps>`
  background: ${({ theme }) => theme.colors.bgSecondary};
  color: ${({ theme }) => theme.colors.white};
  padding: 5px 10px;
  margin: 0 20px;
  font-size: 1.4rem;
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.colors.bgPrimary};
  }
  // Current path:
  &.selected {
    text-decoration: underline;
  }
`

type Props = {
  routes: Route[]
}

const FloatingNavbar = ({ routes }: Props) => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Bar>
      {routes.map(({ display, path }) => (
        <Button
          key={path}
          onClick={() => navigate(path)}
          isSelected={location.pathname === path}
        >
          {display}
        </Button>
      ))}
    </Bar>
  )
}

export { FloatingNavbar }

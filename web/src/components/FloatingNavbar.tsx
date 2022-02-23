import { useNavigate, useLocation } from "react-router-dom"
import styled, { css } from "styled-components"
import { Route } from "../types/route"
import { Button } from "./Button"

const Bar = styled.nav`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 60px;
  background: ${({ theme }) => theme.colors.grayDark};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 5px;
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

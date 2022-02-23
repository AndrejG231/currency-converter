import { Route, Routes } from "react-router-dom"
import { Route as RouteType } from "../types/route"

type Props = {
  routes: RouteType[]
}

const Router = ({ routes }: Props) => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
    </Routes>
  )
}

export { Router }

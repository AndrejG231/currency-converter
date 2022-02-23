import { BrowserRouter, Route, Routes } from "react-router-dom"
import { routes } from "./routes"

const Router = () => {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.path} {...route} />
      ))}
    </Routes>
  )
}

export { Router }

import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "./GlobalStyle"
import { Router } from "../components/Router"
import { theme } from "./theme"
import { Screen } from "../components/Screen"
import { routes } from "./routes"
import { BrowserRouter } from "react-router-dom"
import { FloatingNavbar } from "../components/FloatingNavbar"

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Screen>
          <FloatingNavbar routes={routes} />
          <Router routes={routes} />
        </Screen>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export { App }

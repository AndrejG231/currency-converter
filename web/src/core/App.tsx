import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "./GlobalStyle"
import { Router } from "../components/Router"
import { theme } from "./theme"
import { Screen } from "../components/Screen"
import { routes } from "./routes"
import { BrowserRouter } from "react-router-dom"
import { FloatingNavbar } from "../components/FloatingNavbar"
import { Header } from "../components/Header"

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Screen>
          <Router routes={routes} />
          <Header>Currency Converter</Header>
          <FloatingNavbar routes={routes} />
        </Screen>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export { App }

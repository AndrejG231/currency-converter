import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "./GlobalStyle"
import { Router } from "./Router"
import { theme } from "./theme"
import { Screen } from "../components/Screen"
import { routes } from "./routes"
import { BrowserRouter } from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Screen>
          <Router />
        </Screen>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export { App }

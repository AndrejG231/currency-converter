import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "./GlobalStyle"
import { Router } from "./Routes"
import { theme } from "./theme"

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  )
}

export { App }

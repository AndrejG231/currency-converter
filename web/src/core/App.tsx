import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "./GlobalStyle"
import { Router } from "../components/Router"
import { theme } from "./theme"
import { Screen } from "../components/Screen"
import { routes } from "./routes"
import { BrowserRouter } from "react-router-dom"
import { FloatingNavbar } from "../components/FloatingNavbar"
import { Header } from "../components/Header"
import { Main } from "../components/Main"
import { ApolloProvider } from "@apollo/client"
import { client } from "../api/client"

const App = () => {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Screen>
            <Header>Currency Converter</Header>
            <Main>
              <Router routes={routes} />
            </Main>
            <FloatingNavbar routes={routes} />
          </Screen>
        </ThemeProvider>
      </ApolloProvider>
    </BrowserRouter>
  )
}

export { App }

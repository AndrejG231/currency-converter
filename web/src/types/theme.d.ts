import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bgPrimary: string
      bgSecondary: string
      white: string
    }
  }
}

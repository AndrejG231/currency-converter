import styled from "styled-components"

export const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template:
    "source destination" auto
    "input input" 40px
    "result result" 100px
    "confirm confirm" 50px / 1fr 1fr;
  gap: 20px;
  place-items: center;
  padding: 20px;
  @media screen and (max-width: 768px) {
    grid-template:
      "source" auto
      "destination" auto
      "input" 40px
      "result" 100px
      "confirm" 50px / 1fr;
  }
`

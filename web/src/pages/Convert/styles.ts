import styled from "styled-components"

export const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template:
    "source destination" auto
    "result result" 100px
    "input input" 40px
    "confirm confirm" 50px / 1fr 1fr;
  gap: 20px;
  place-items: center;
  padding: 20px;
`

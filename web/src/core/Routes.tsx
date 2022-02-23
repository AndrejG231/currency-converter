import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Convert } from "../pages/Convert"
import { Statistics } from "../pages/Statistics"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Convert />} />
        <Route path="/stats" element={<Statistics />} />
      </Routes>
    </BrowserRouter>
  )
}

export { Router }

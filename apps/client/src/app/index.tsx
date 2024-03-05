import { Route, Routes } from "react-router-dom"
import "./styles/index.css"
import { Auth } from "pages/Auth"

export function App() {
  return (
    <Routes>
      <Route element={<Auth />} path="/" />
    </Routes>
  )
}

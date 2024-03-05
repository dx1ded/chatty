import { Route, Routes } from "react-router-dom"
import { Auth } from "pages/Auth"
import "./styles/index.css"


export function App() {
  return (
    <Routes>
      <Route element={<Auth />} path="/" />
    </Routes>
  )
}

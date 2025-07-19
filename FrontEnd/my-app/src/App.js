import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./Components/HomePage"
import LoginPage from "./Components/LoginPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
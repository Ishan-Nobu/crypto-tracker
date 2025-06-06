import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import CryptoPage from "./pages/CryptoPage"
import Header from "./components/Header"
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <div className="bg-gray-900 text-white min-h-dvh">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header/>}>
            <Route index element={<HomePage/>}/>
            <Route path="/crypto/:id" element={<CryptoPage/>}/>
          </Route>
          <Route path="*" element={<div>Page Not Found</div>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer/>
    </div>
  )
}

export default App

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Components/Login'
import Home from '../Pages/Home'
import Perfil from '../Components/Perfil'

const Paths = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Paths

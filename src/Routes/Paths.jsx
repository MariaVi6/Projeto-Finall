import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Components/Login'
import Home from '../Pages/Home'
import PerfilAluno from '../Pages/PerfilAluno'

const Paths = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/perfilaluno" element={<PerfilAluno />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Paths

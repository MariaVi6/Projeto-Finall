import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../Components/Login'
import Home from '../Pages/Home'

const Paths = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default Paths

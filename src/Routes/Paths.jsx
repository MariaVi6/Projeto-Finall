import { BrowserRouter,Route,Routes } from "react-router-dom";
import Login from "../Components/Login"
const Paths = () => {
    return ( 
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    </> 
    );
}

export default Paths;
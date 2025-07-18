// import Loader from "./components/common/Loader"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from "./components/common/Header"
import Error from "./pages/Error"
import Home from "./pages/Protected/Home"
import Search from "./pages/Protected/Search"
import Register from "./pages/Protected/Register"
import './index.css'
import ProtectedLayout from "./pages/Protected/ProtectedLayout"
import { Box } from "@mui/material"


  const App = ()=>{

  return(<>

    <Box minHeight={'100vh'}>
  <BrowserRouter>

    <Routes>
      <Route exact path='/' element={<ProtectedLayout />}>
      
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<h1>Single Post</h1>} />
      <Route path="/search" element={<Search />} />
      <Route path="/Liked" element={<h1>Liked</h1>} />
      <Route path="/Edit" element={<h1>Edit</h1>} />
      <Route path="/Profile" element={<h1>Profile</h1>} /> 
      
      </Route>
    
      <Route path="*" element={<Error />} /> 

    </Routes>

  </BrowserRouter>

      </Box> 

  </>
  )
}

export default App
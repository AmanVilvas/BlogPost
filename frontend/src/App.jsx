// import Loader from "./components/common/Loader"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from "./components/common/Header"
import Error from "./pages/Error"
import Home from "./pages/Protected/Home"
import Search from "./pages/Protected/Search"
import Register from "./pages/Register"
import './index.css'
import ProtectedLayout from "./pages/Protected/ProtectedLayout"
import { Box } from "@mui/material"
import ProfileLayout from './pages/Protected/profile/ProfileLayout'
import Threads from './pages/Protected/profile/Threads'
import Replies from './pages/Protected/profile/Replies'
import Reposts from './pages/Protected/profile/Reposts'
import SinglePost from "./pages/Protected/SInglePost"

  const App = ()=>{

    const data = 1

  return(<>

    <Box minHeight={'100vh'}>
  <BrowserRouter>

    <Routes>
      {
        data ? <Route exact path='/' element={<ProtectedLayout />}>
      
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<SinglePost />} />
      <Route path="/search" element={<Search />} />
      <Route path="/Liked" element={<h1>Liked</h1>} />
      <Route path="/Edit" element={<h1>Edit</h1>} />
      <Route path="/profile" element={<ProfileLayout />} >
        <Route exact path = "threads/:id" element={<Threads />} />
        <Route exact path = "replies/:id" element={<Replies />} />
        <Route exact path = "reposts/:id" element={<Reposts />} />
      </Route> 
      
      </Route>   
        :  
      <Route path="/" element={<Register />} />
      }
      
      <Route path="*" element={<Error />} /> 

    </Routes>

  </BrowserRouter>

      </Box> 

  </>
  )
}

export default App
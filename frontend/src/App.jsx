// import Loader from "./components/common/Loader"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Error from "./pages/Error"
import Home from "./pages/Protected/Home"
import Search from "./pages/Protected/Search"
import Register from "./pages/Register"
import './index.css'
import ProtectedLayout from "./pages/Protected/ProtectedLayout"
import { Box, CssBaseline } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import ProfileLayout from './pages/Protected/profile/ProfileLayout'
import Threads from './pages/Protected/profile/Threads'
import Replies from './pages/Protected/profile/Replies'
import Reposts from './pages/Protected/profile/Reposts'
import SinglePost from "./pages/Protected/SInglePost"
import { useSelector } from 'react-redux'
import { useEffect, useMemo } from "react"
import { useMyInfoQuery } from "./redux/service"


  const App = ()=>{

    const { data, error, isLoading } = useMyInfoQuery()
    const {darkMode} = useSelector(state=>state.service)

    const theme = useMemo(() => {
      return createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          background: {
            default: darkMode ? '#000000' : '#ffffff',
            paper: darkMode ? '#0b0b0b' : '#ffffff',
          },
        },
      })
    }, [darkMode])

    useEffect(() => {
      const root = document.documentElement
      if (darkMode) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }, [darkMode])
    
    console.log('MyInfo Query State:', { 
      isAuthenticated: !!data,
      isLoading, 
      hasError: !!error 
    })
    
    if (error) {
      console.error('Authentication Error:', error)
      if (error.data) {
        console.error('Error details:', error.data)
      }
      if (error.status) {
        console.error('Error status:', error.status)
      }
    }

  return(<>

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        minHeight={'100vh'}
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          transition: 'background-color 0.3s ease, color 0.3s ease'
        }}
      >
    <BrowserRouter>

    <Routes>
      {
       
        !error && !isLoading ? <Route exact path='/' element={<ProtectedLayout />}>
      
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
      </ThemeProvider>

  </>
  )
}

export default App
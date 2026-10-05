import Loader from "./components/common/Loader"
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
import SinglePost from "./pages/Protected/SinglePost"
import Notifications from "./pages/Protected/Notifications"
import { GuestAccessProvider } from "./components/common/GuestAccess"
import { useSelector } from 'react-redux'
import { useEffect, useMemo } from "react"
import { useMyInfoQuery } from "./redux/service"

  const App = ()=>{

  const { data, error, isLoading } = useMyInfoQuery()
  const { darkMode } = useSelector(state => state.service)

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light',
        background: {
          default: darkMode ? '#101010' : '#ffffff',
          paper: darkMode ? '#181818' : '#ffffff',
        },
        text: {
          primary: darkMode ? '#f3f5f7' : '#000000',
          secondary: darkMode ? '#777777' : '#999999',
        },
        divider: darkMode ? 'rgba(243, 245, 247, 0.15)' : 'rgba(0, 0, 0, 0.08)',
      },
      shape: {
        borderRadius: 16,
      },
      typography: {
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
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

    <GuestAccessProvider>
    <Routes>
      {
        isLoading ? (
          <Route path="*" element={<Loader />} />
        ) : !error && data ? (
          <Route path='/' element={<ProtectedLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<SinglePost />} />
            <Route path="/search" element={<Search />} />
            <Route path="/activity" element={<Notifications />} />
            <Route path="/Edit" element={<h1>Edit</h1>} />
            <Route path="/profile" element={<ProfileLayout />} >
              <Route exact path="threads/:id" element={<Threads />} />
              <Route exact path="replies/:id" element={<Replies />} />
              <Route exact path="reposts/:id" element={<Reposts />} />
            </Route> 
          </Route>   
        ) : (
          <>
            <Route path="/guest" element={<ProtectedLayout guest />}>
              <Route index element={<Home />} />
              <Route path="post/:id" element={<SinglePost />} />
              <Route path="search" element={<Search />} />
              <Route path="profile" element={<ProfileLayout />}>
                <Route path="threads/:id" element={<Threads />} />
                <Route path="replies/:id" element={<Replies />} />
                <Route path="reposts/:id" element={<Reposts />} />
              </Route>
            </Route>
            <Route path="*" element={<Register />} />
          </>
        )
      }
    </Routes>
    </GuestAccessProvider>

  </BrowserRouter>

        </Box>
      </ThemeProvider>

  </>
  )
}

export default App

import { Alert, Button, Stack, TextField, Typography, useMediaQuery } from "@mui/material"
import { useEffect, useState  } from "react"
import { useSelector } from 'react-redux'
import { useSigninMutation, useLoginMutation } from "../redux/service"
import { useNavigate } from "react-router-dom"


const Register = ()=>{

    const _700 = useMediaQuery("(min-width:700px)")
    const navigate = useNavigate()
   
    const [ signinUser, signinUserData] = useSigninMutation()
    const [ loginUser, loginUserData] = useLoginMutation()

   
    const {darkMode} = useSelector(state=>state.service)

    const [login, setLogin] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [redirecting, setRedirecting] = useState(false)


    const toggleLogin = ()=>{
        setLogin((pre)=> !pre)
        setErrorMsg('')
        setSuccessMsg('')
    }
    
    const handleRegister = async()=>{
        if (!userName || !email || !password) {
            setErrorMsg('All fields are required')
            return
        }
        try {
            const data = {userName, email, password}
            await signinUser(data);
        } catch (err) {
            console.error("Registration error:", err)
            setErrorMsg(err?.data?.msg || 'Registration failed')
        }
    }

    
    const handleLogin = async()=>{
        if (!email || !password) {
            setErrorMsg('Email and password are required')
            return
        }
        try {
            const data = {email, password}
            await loginUser(data)
        } catch (err) {
            console.error("Login error:", err)
            setErrorMsg(err?.data?.msg || 'Login failed')
        }
    }
    
    useEffect(()=>{
        if(signinUserData.isSuccess){
            console.log("Signin success:", signinUserData.data);
            setSuccessMsg(signinUserData.data?.msg || 'Registration successful!')
            setErrorMsg('')
            
            // Add a delay before redirecting to show success message
            setRedirecting(true)
            setTimeout(() => {
                // Force page reload to refresh authentication state
                window.location.href = '/'
            }, 1500)
        }
        
        if(signinUserData.isError){
            console.log("Signin error:", signinUserData.error);
            setErrorMsg(signinUserData.error?.data?.msg || 'Registration failed. Please try again.')
            setSuccessMsg('')
        }
    }, [signinUserData.isSuccess, signinUserData.isError])
    
    useEffect(()=>{
        if(loginUserData.isSuccess){
            console.log("Login success:", loginUserData.data);
            setSuccessMsg(loginUserData.data?.msg || 'Login successful!')
            setErrorMsg('')
            
            // Add a delay before redirecting to show success message
            setRedirecting(true)
            setTimeout(() => {
                // Force page reload to refresh authentication state
                window.location.href = '/'
            }, 1500)
        }
        
        if(loginUserData.isError){
            console.log("Login error:", loginUserData.error);
            setErrorMsg(loginUserData.error?.data?.msg || 'Login failed. Please try again.')
            setSuccessMsg('')
        }
    }, [loginUserData.isSuccess, loginUserData.isError])

    return <Stack width={"100%"} 
    height={"100vh"}
    justifyContent={"center"}
    alignItems={"center"}
    flexDirection={"row"}
    sx={{
        backgroundColor: darkMode ? '#000000' : '#ffffff',
        color: darkMode ? '#ffffff' : '#000000',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        ...(_700 ? {backgroundImage:'url("public/woodcuts_14.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 200px'} : {})
    }}
>
        <Stack flexDirection={'column'} width={_700 ? '50%' : '90%'} 
        gap={1.5} mt={_700 ? 20 : 0}
        >
        <Typography variant="h2" 
        alignSelf={'center'}
        fontSize={_700 ? '1.5rem' : '1rem'}
        >{ login ? "Login with email" : "Register with email" }
        </Typography>
        
        {errorMsg && (
          <Alert severity="error" sx={{ width: '100%' }}>{errorMsg}</Alert>
        )}
        
        {successMsg && (
          <Alert severity="success" sx={{ width: '100%' }}>{successMsg}</Alert>
        )}
        
        {
            login ? null : (
    <TextField variant="outlined" 
        placeholder="Enter your username"
        onChange={(e)=>{ setUserName(e.target.value)}}     
        />
            )
        }
        
        <TextField variant="outlined" 
        placeholder="Enter your email"
        onChange={(e)=>{ setEmail(e.target.value)}}
        />
        <TextField variant="outlined" 
        placeholder="Enter your password"
        type="password"
        onChange={(e)=>{ setPassword(e.target.value)}}
        />

        <Button sx={{
            width:'100%',
            alignSelf:'center',
            bgcolor:'blue',
            color:'white',
            ":hover":{
                bgcolor:'green'
            }
        }}
            onClick={login ? handleLogin : handleRegister}
            disabled={redirecting}
        >
        {
            redirecting 
            ? "Redirecting..." 
            : login 
              ? "Login" 
              : "Sign up"
        }</Button>

        <Typography variant="subtitle1" alignSelf={'center'}fontSize={_700 ? '1.2rem' : '1rem'}
        >
        {login ? "first time here?" : "Already have an account" }<span className={"login-link"} onClick={toggleLogin}> {
            login ? "Sign up" : "Login"
                }</span>
        </Typography>

            </Stack>


    </Stack>
}
export default Register


//3:15
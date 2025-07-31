import { Button, Stack, TextField, Typography, useMediaQuery } from "@mui/material"
import { useState  } from "react"


const Register = ()=>{

    const _700 = useMediaQuery("(min-width:700px)")

    const [login, setLogin] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')


    const toggleLogin = ()=>{
        setLogin((pre)=> !pre)
    }
    const handleRegister = ()=>{
        const data = {username, email, password}
    console.log(data);
    }
    const handleLogin = ()=>{
    const data = {email, password}
    console.log(data);

    }

    return <Stack width={"100%"} 
    height={"100vh"}
    justifyContent={"center"}
    alignItems={"center"}
    flexDirection={"row"}
    sx={
        _700 ? {backgroundImage:'url("public/woodcuts_14.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 200px'} : null
    }
>
        <Stack flexDirection={'column'} width={_700 ? '50%' : '90%'} 
        gap={1.5} mt={_700 ? 20 : 0}
        >
        <Typography variant="h2" 
        alignSelf={'center'}
        fontSize={_700 ? '1.5rem' : '1rem'}
        >{ login ? "Login with email" : "Register with email" }
        </Typography>
        {
            login ? null : (
    <TextField variant="outlined" 
        placeholder="Enter your username"
        onChange={(e)=>{ setUsername(e.target.value)}}     
        />
            )
        }
        
        <TextField variant="outlined" 
        placeholder="Enter your email"
        onChange={(e)=>{ setEmail(e.target.value)}}
        />
        <TextField variant="outlined" 
        placeholder="Enter your password"
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
        >
        {

        login ? "Login" : " Sign up"
        
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
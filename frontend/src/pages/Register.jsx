import { Button, Stack, TextField, Typography } from "@mui/material"
import { useState  } from "react"


const Register = ()=>{

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
    sx={{
        backgroundImage:'url("public/threads-logo-black-background-vector_1017-45262.webp")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '5% '
    }}
>
        <Stack flexDirection={'column'} width={'50%'} 
        gap={1.5} mt={5}
        >
        <Typography variant="h2" 
        alignSelf={'center'}
        fontSize={'1.5rem'}
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

        <Typography variant="subtitle1" alignSelf={'center'}
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
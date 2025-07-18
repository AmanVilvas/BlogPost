import { Button, Stack, TextField, Typography } from "@mui/material"



 const Register = ()=>{
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
        >Register with email</Typography>
    
        <TextField variant="outlined" 
        placeholder="Enter your username" />
        <TextField variant="outlined" 
        placeholder="Enter your email" />
        <TextField variant="outlined" 
        placeholder="Enter your password" />

        <Button sx={{
            width:'100%',
            alignSelf:'center',
            bgcolor:'blue',
            color:'white',
            ":hover":{
                bgcolor:'green'
            }
        }}>Sign Up</Button>

        <Typography variant="subtitle1" alignSelf={'center'}
        >
            not your first time? <span className={"login-link"}> Login Here!</span>
        </Typography>

            </Stack>


    </Stack>
}
export default Register
import { Alert, Box, Button, Stack, Typography, useMediaQuery, TextField } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useSigninMutation, useLoginMutation, useGoogleLoginMutation } from "../redux/service"
import { GoogleLogin } from '@react-oauth/google'
import BlogPostLogo from "../components/common/BlogPostLogo"
import { Link } from 'react-router-dom'

const Register = () => {
    const _700 = useMediaQuery("(min-width:700px)")

    const [signinUser, signinUserData] = useSigninMutation()
    const [loginUser, loginUserData] = useLoginMutation()
    const [googleLoginUser] = useGoogleLoginMutation()

    const { darkMode } = useSelector(state => state.service)

    const [login, setLogin] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [redirecting, setRedirecting] = useState(false)

    const toggleLogin = () => {
        setLogin((pre) => !pre)
        setErrorMsg('')
        setSuccessMsg('')
    }

    const handleRegister = async (e) => {
        e?.preventDefault()
        if (!userName || !email || !password) {
            setErrorMsg('All fields are required')
            return
        }
        try {
            const data = { userName, email, password }
            await signinUser(data)
        } catch (err) {
            console.error("Registration error:", err)
            setErrorMsg(err?.data?.msg || 'Registration failed')
        }
    }

    const handleLogin = async (e) => {
        e?.preventDefault()
        if (!email || !password) {
            setErrorMsg('Email and password are required')
            return
        }
        try {
            const data = { email, password }
            await loginUser(data)
        } catch (err) {
            console.error("Login error:", err)
            setErrorMsg(err?.data?.msg || 'Login failed')
        }
    }

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const data = {
                credential: credentialResponse.credential,
                ...(!login && userName ? { userName } : {})
            }

            const res = await googleLoginUser(data).unwrap()

            if (res.requireUsername) {
                setErrorMsg('Please enter a username above and click Google Sign In again to register.')
                setLogin(false)
            } else {
                setSuccessMsg(res.msg || 'Logged in successfully with Google!')
                setErrorMsg('')
                setRedirecting(true)
                setTimeout(() => {
                    window.location.href = '/'
                }, 1200)
            }
        } catch (err) {
            console.error("Google login error:", err)
            setErrorMsg(err?.data?.msg || 'Google Login failed')
        }
    }

    useEffect(() => {
        if (signinUserData.isSuccess) {
            setSuccessMsg(signinUserData.data?.msg || 'Registration successful!')
            setErrorMsg('')
            setRedirecting(true)
            setTimeout(() => {
                window.location.href = '/'
            }, 1200)
        }

        if (signinUserData.isError) {
            setErrorMsg(signinUserData.error?.data?.msg || 'Registration failed. Please try again.')
            setSuccessMsg('')
        }
    }, [signinUserData.isSuccess, signinUserData.isError])

    useEffect(() => {
        if (loginUserData.isSuccess) {
            setSuccessMsg(loginUserData.data?.msg || 'Login successful!')
            setErrorMsg('')
            setRedirecting(true)
            setTimeout(() => {
                window.location.href = '/'
            }, 1200)
        }

        if (loginUserData.isError) {
            setErrorMsg(loginUserData.error?.data?.msg || 'Login failed. Please try again.')
            setSuccessMsg('')
        }
    }, [loginUserData.isSuccess, loginUserData.isError])

    const inputStyles = {
        width: '100%',
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            bgcolor: darkMode ? '#1e1e1e' : '#f5f5f5',
            color: 'inherit',
            transition: 'border-color 0.2s, background-color 0.2s',
            '& fieldset': {
                border: '1px solid',
                borderColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
            },
            '&:hover fieldset': {
                borderColor: darkMode ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)',
            },
            '&.Mui-focused fieldset': {
                borderColor: darkMode ? '#ffffff' : '#000000',
                borderWidth: '1.5px',
            },
        },
        '& .MuiInputBase-input': {
            py: 1.6,
            px: 2,
            fontSize: '0.95rem',
            fontFamily: 'inherit',
            '&::placeholder': {
                color: darkMode ? '#777' : '#999',
                opacity: 1,
            },
        },
    }

    return (
        <Stack
            width="100%"
            minHeight="100vh"
            justifyContent="center"
            alignItems="center"
            sx={{
                bgcolor: 'background.default',
                color: 'text.primary',
                px: 2,
                py: 4,
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    maxWidth: 400,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* Logo & Headline */}
                <Box mb={3}>
                    <BlogPostLogo height={56} />
                </Box>

                <Typography
                    variant="h5"
                    fontWeight={800}
                    letterSpacing="-0.03em"
                    textAlign="center"
                    mb={0.5}
                >
                    {login ? "Log in with your BlogPost account" : "Join BlogPost today"}
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    textAlign="center"
                    mb={3.5}
                >
                    {login ? "Say more with BlogPost" : "Share ideas, follow friends, and join the conversation."}
                </Typography>

                {/* Alerts */}
                {errorMsg && (
                    <Alert
                        severity="error"
                        sx={{
                            width: '100%',
                            mb: 2,
                            borderRadius: '12px',
                            fontSize: '0.88rem',
                        }}
                    >
                        {errorMsg}
                    </Alert>
                )}

                {successMsg && (
                    <Alert
                        severity="success"
                        sx={{
                            width: '100%',
                            mb: 2,
                            borderRadius: '12px',
                            fontSize: '0.88rem',
                        }}
                    >
                        {successMsg}
                    </Alert>
                )}

                {/* Form Inputs */}
                <Box
                    component="form"
                    onSubmit={login ? handleLogin : handleRegister}
                    sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                    {!login && (
                        <TextField
                            sx={inputStyles}
                            placeholder="Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    )}

                    <TextField
                        sx={inputStyles}
                        placeholder="Email address"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <TextField
                        sx={inputStyles}
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* High-Contrast Pill Action Button */}
                    <Button
                        type="submit"
                        disabled={redirecting}
                        sx={{
                            mt: 1,
                            py: 1.5,
                            width: '100%',
                            borderRadius: '12px',
                            bgcolor: darkMode ? '#ffffff' : '#000000',
                            color: darkMode ? '#000000 !important' : '#ffffff !important',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            letterSpacing: '-0.01em',
                            textTransform: 'none',
                            transition: 'opacity 0.18s ease',
                            '&:hover': {
                                bgcolor: darkMode ? '#e5e5e5' : '#1f1f1f',
                                opacity: 0.95,
                            },
                        }}
                    >
                        {redirecting
                            ? "Redirecting..."
                            : login
                                ? "Log in"
                                : "Sign up"}
                    </Button>
                </Box>

                {/* Toggle Login / Sign Up */}
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 3, textAlign: 'center' }}
                >
                    {login ? "Don't have an account? " : "Already have an account? "}
                    <Box
                        component="span"
                        className="login-link"
                        onClick={toggleLogin}
                        sx={{ color: 'text.primary', fontWeight: 600, cursor: 'pointer' }}
                    >
                        {login ? "Sign up" : "Log in"}
                    </Box>
                </Typography>

                {/* Divider */}
                <Stack direction="row" alignItems="center" width="100%" my={3} spacing={2}>
                    <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
                    <Typography variant="caption" color="text.secondary" fontWeight={500}>
                        or
                    </Typography>
                    <Box sx={{ flex: 1, height: '1px', bgcolor: 'divider' }} />
                </Stack>

                {/* Google Sign In */}
                <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                    <GoogleLogin
                        theme={darkMode ? 'filled_black' : 'outline'}
                        shape="pill"
                        onSuccess={handleGoogleSuccess}
                        onError={() => {
                            setErrorMsg('Google sign-in is not configured for this site address yet. You can use email sign-up, or ask the site owner to add this site under Authorized JavaScript origins in Google Cloud.')
                        }}
                    />
                </Box>

                <Button component={Link} to="/guest" variant="text" sx={{ mt: 2.5, color: 'text.secondary', fontWeight: 650, textTransform: 'none', borderRadius: 99, px: 2.5 }}>
                    Continue as guest
                </Button>

                {/* Footer branding */}
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 5, fontSize: '0.75rem', opacity: 0.7 }}
                >
                    Your space to share, connect, and create.
                </Typography>
            </Box>
        </Stack>
    )
}

export default Register

import { Stack, Typography, Button } from '@mui/material'
import React from 'react'


function Error() {
    return (
        <div>
            <Stack
                width={"100%"}
                height={"100vh"}
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                sx={{
                    background: 'url("/error.webp")',
                    backgroundRepeat: "no-repeat",
                    backgroundPositionX: "center",
                    backgroundPositionY: "bottom"
                }}
            >
                <Stack
                    paddingBottom={'350px'}
                    gap={3}

                >
                    <Stack >
                        <Typography variant='h2'>
                            <b>Oh No!</b>
                        </Typography>
                        <Typography
                            variant='p'>
                            This page doesnt exists...
                        </Typography>
                    </Stack>

                    <Button size="medium"
                        sx={{
                            bgcolor: "blue", color: "white", p: 2, borderRadius: 6, ":hover":{
                                bgcolor: "black"
                                
                            }
                        }}  >Back to Home</Button>
                </Stack>
            </Stack>
        </div>
    )
}

export default Error

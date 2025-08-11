import React from 'react'
import { Stack, Badge, Avatar, Stepper, AvatarGroup, useMediaQuery } from '@mui/material' 

function PostOne() {
    const _700 = useMediaQuery('(min-width:700px)')
  const _300 = useMediaQuery("(min-width:300px)")
        const _400 = useMediaQuery("(min-width:400px)")
        const _500 = useMediaQuery("(min-width:500px)")

    return (
        <div>

        <Stack 
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'space-between'}
        >
            <Badge overlap='circular' anchorOrigin={{vertical :'bottom', horizontal:'right'}} 
            badgeContent={
                <Avatar
                alt='+'
                src=''
                sx={{
                    width: _700 ? 20 : 14,
                    height: _700 ? 20 : 14, //3:43
                    bgcolor: 'green',
                    position: 'relative',
                    right: _700 ? 4 : 0,
                    bottom: _700 ? 4 : 0

                }}
                > + </Avatar>
            }    
                >
            <Avatar alt='AJ' sx={{width: _700 ? 40 : 32 ,height: _700 ? 40 : 32 }}/>
                </Badge>
            <Stack
            flexDirection={'column'}
            alignItems={'center'}
            gap={2}
            height={'100%'}
            >
                <Stepper
                orientation={"vertical"}
                activeStep={0}
                sx={{
                    border: '0.1rem solid blue',
                    width:'0px',
                    height: _700 ? '330px' : _500 ? '290px' : _400 ? '240px' : _300 ? '200px' : '150px'
                }}
                ></Stepper>
                <AvatarGroup total={4} sx={{
                    '& .MuiAvatar-root':{
                        width: _700 ? 24 : 16,
                        height: _700 ? 24 : 16,
                        fontSize: _700 ? 12 : 8,
                    },
                }}>
                    <Avatar src='' alt=''/>
                    <Avatar src='' alt=''/>
                </AvatarGroup>
            </Stack>


        </Stack>

        </div >
    )
}

export default PostOne
import React from 'react'
import { Stack, useMediaQuery,Grid  } from '@mui/material'
import Navbar from './Navbar'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMenu } from "react-icons/io5";



function Header() {
    const _700 = useMediaQuery('(min-width:700px )')
    return (
        <>
       { _700 ? <Stack flexDirection={"row"}
        position={"sticky"}
        justifyContent={"space-around"}
        height={52}
        alignItems={"center"}
        top={0}
        py={1}
        >
            <img src='public\threads-logo-black-background-vector_1017-45262.webp' alt='logo' 
            width={45}
            height={45}/>

            <Stack
            justifyContent={'center'} 
            width={'500px'}
            bgcolor={'AliceBlue'}
            color={'black'}
            zIndex={2}
            height={'70px'}>
                <Navbar />
                <IoMenu size={36} color='grey' className='image-icon' />
            </Stack>
                
            <GiHamburgerMenu size={28} className='menuIcon' color='grey' />
 {/* 3:34 */}
        </Stack>    :  (
            <>
            <Stack position={'fixed'} top={-25}justifyContent={'center'} width={'100%'}
            height={62} p={1} bgcolor={'white'}
            border={.01} borderColor={'grey'}
            zIndex={2}
            >
                <Navbar />
                <Grid container alignItems={'center'} 
                height={60} p={1} justifyContent={'space-evenly'} >
                
                <Grid item xs={6} >
                <img src="public\thread-black.png" alt="logo" width={60} height={35} />
                </Grid>
               <IoMenu size={36} className='image-icon' color='grey' />
                </Grid>
            </Stack>
            </>
        )}
        </>
        
    )
}

export default Header

import React from 'react'
import { Stack  } from '@mui/material'
import Navbar from './Navbar'
import { GiHamburgerMenu } from "react-icons/gi";



function Header() {
    return (
        <Stack flexDirection={"row"}
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
            </Stack>
                
            <GiHamburgerMenu size={28} className='menuIcon'/>

        </Stack>    
        
    )
}

export default Header

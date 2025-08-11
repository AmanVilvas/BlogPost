import React, { useState } from 'react'
import { Stack, useMediaQuery,Grid  } from '@mui/material'
import Navbar from './Navbar'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMenu } from "react-icons/io5";
import MainMenu from '../menu/MainMenu'



function Header() {
    const [menuAnchorEl, setMenuAnchorEl] = useState(null);

    const handleOpenMenu = (event) => {
        setMenuAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setMenuAnchorEl(null);
    };
    const _700 = useMediaQuery('(min-width:700px )')
    // const _300 = useMediaQuery('(min-width:300px)')
    const _500 = useMediaQuery('(min-width:500px)')

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
            <img
              src='public\\logo-bgremoved.png'
              alt='logo'
              style={{ height: 45, width: 'auto', objectFit: 'contain' }}
            />

            { _700 ? <Stack
            justifyContent={'center'} 
            width={'500px'}
            bgcolor={'AliceBlue'}
            color={'black'}
            zIndex={2}
            height={'70px'}
            >
                <Navbar />
            </Stack>
            : " "}
                
            <GiHamburgerMenu size={28} className='menuIcon' color='grey' onClick={handleOpenMenu}
             style={{ cursor: 'pointer' }} />
 {/* 3:34 */}
        </Stack>    :  (
            <>
            <Stack position={'fixed'} top={-25}justifyContent={'center'} width={'100%'}
            height={62} p={1} bgcolor={'white'}
            border={.01} borderColor={'grey'}
            zIndex={2}
            >
                <Grid container alignItems={'center'} 
                height={36} p={1} justifyContent={'space-evenly'} >
                
                <Grid item xs={6} >
                <img
                  src="public\\logo-bgremoved.png"
                  alt="logo"
                  style={{ height: 35, width: 'auto', objectFit: 'contain' }}
                />
                </Grid>
               <IoMenu size={36} className='image-icon' color='grey' onClick={handleOpenMenu} 
                style={{ cursor: 'pointer' }}/>
                </Grid>
            </Stack>
            </>
        )}
        <MainMenu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleCloseMenu}

        />
        </>
        
    )
}

export default Header

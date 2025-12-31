import React, { useState, useEffect } from 'react'
import { Stack, useMediaQuery, Grid } from '@mui/material'
import Navbar from './Navbar'
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMenu } from "react-icons/io5";
import MainMenu from '../menu/MainMenu'
import ErrorBoundary from './ErrorBoundary'
import { useDispatch, useSelector } from 'react-redux';
import { toggleMainMenu } from '../../redux/slice';


function Header() {
    const dispatch = useDispatch()
    const menuAnchorEl = useSelector((state) => state.service.openmenu);
    const {darkMode} = useSelector((state) => state.service)
    const handleOpenMenu = (event) => {
      // Toggle menu - if already open, close it; if closed, open it
      if (menuAnchorEl) {
        dispatch(toggleMainMenu(null));
      } else {
        dispatch(toggleMainMenu(event.currentTarget)); 
      }
    };

    const handleCloseMenu = () => {
        dispatch(toggleMainMenu(null));
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuAnchorEl && !menuAnchorEl.contains(event.target)) {
                dispatch(toggleMainMenu(null));
            }
        };

        if (menuAnchorEl) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuAnchorEl, dispatch]);
    
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
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
        >
            {
              darkMode ? <img
              src='public\\logo-bgremoved.png'
              alt='logo'
              style={{ height: 45, width: 'auto', objectFit: 'contain' }}
            /> : <img
            //change white bg here
            src='public\\logo-bgremoved.png'
            alt='logo'
            style={{ height: 45, width: 'auto', objectFit: 'contain' }}
          />
            }

            { _700 ? <Stack
            justifyContent={'center'} 
            width={'500px'}
            sx={{
              bgcolor: 'background.paper',
              color: 'text.primary',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
            }}
            zIndex={2}
            height={'70px'}
            >
                <Navbar />
            </Stack>
            : " "}
                
            <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
                <GiHamburgerMenu size={28} className='menuIcon' color='grey' onClick={handleOpenMenu}
                 style={{ cursor: 'pointer' }} />
            </Stack>
 {/* 3:34 */}
        </Stack>    :  (
            <>
            <Stack position={'fixed'} top={-25}justifyContent={'center'} width={'100%'}
            height={62} p={1}
            sx={{
              bgcolor: 'background.default',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
            zIndex={2}
            >
                <Grid container alignItems={'center'} 
                height={36} p={1} justifyContent={'space-evenly'} >
                
                <Grid size={6} >
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
        <ErrorBoundary>
          <MainMenu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleCloseMenu}
          />
        </ErrorBoundary>
        </>
        
    )
}

export default Header

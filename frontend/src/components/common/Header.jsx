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
        justifyContent={"space-between"}
        height={56}
        alignItems={"center"}
        top={0}
        px={3}
        sx={{
          bgcolor: 'background.default',
          borderBottom: '1px solid',
          borderColor: 'divider',
          zIndex: 10,
        }}
        >
            <img
              src='/logo-bgremoved.png'
              alt='Threads logo'
              style={{ height: 36, width: 'auto', objectFit: 'contain' }}
            />

            <Stack justifyContent={'center'} width={'480px'}>
                <Navbar />
            </Stack>
                
            <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
                <GiHamburgerMenu size={24} className='menuIcon' color={darkMode ? '#ccc' : '#555'} onClick={handleOpenMenu}
                 style={{ cursor: 'pointer' }} />
            </Stack>
 {/* 3:34 */}
        </Stack>    :  (
            <>
            <Stack position={'fixed'} top={0} justifyContent={'space-between'} flexDirection={'row'} width={'100%'}
            alignItems={'center'}
            height={52} px={2}
            sx={{
              bgcolor: 'background.default',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
            zIndex={10}
            >
                <img
                  src="/logo-bgremoved.png"
                  alt="logo"
                  style={{ height: 30, width: 'auto', objectFit: 'contain' }}
                />
               <IoMenu size={28} className='image-icon' color={darkMode ? '#ccc' : '#555'} onClick={handleOpenMenu} 
                style={{ cursor: 'pointer' }}/>
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

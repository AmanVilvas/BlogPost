import React, { useEffect } from 'react'
import { Stack, useMediaQuery, Box, IconButton } from '@mui/material'
import Navbar from './Navbar'
import { GiHamburgerMenu } from "react-icons/gi"
import { IoMenu } from "react-icons/io5"
import MainMenu from '../menu/MainMenu'
import ErrorBoundary from './ErrorBoundary'
import BlogPostLogo from './BlogPostLogo'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMainMenu } from '../../redux/slice'

function Header() {
    const dispatch = useDispatch()
    const menuAnchorEl = useSelector((state) => state.service.openmenu)
    const { darkMode } = useSelector((state) => state.service)

    const handleOpenMenu = (event) => {
        if (menuAnchorEl) {
            dispatch(toggleMainMenu(null))
        } else {
            dispatch(toggleMainMenu(event.currentTarget))
        }
    }

    const handleCloseMenu = () => {
        dispatch(toggleMainMenu(null))
    }

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuAnchorEl && !menuAnchorEl.contains(event.target)) {
                dispatch(toggleMainMenu(null))
            }
        }

        if (menuAnchorEl) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [menuAnchorEl, dispatch])

    const _700 = useMediaQuery('(min-width:700px)')

    return (
        <>
            {_700 ? (
                <Stack
                    flexDirection={'row'}
                    position={'sticky'}
                    justifyContent={'space-between'}
                    height={64}
                    alignItems={'center'}
                    top={0}
                    px={3}
                    className="threads-header"
                    sx={{
                        zIndex: 100,
                        borderBottom: '1px solid',
                        borderColor: 'divider',
                        transition: 'background-color 0.2s ease, border-color 0.2s ease',
                    }}
                >
                    {/* Left: BlogPost Logo */}
                    <Box sx={{ width: 180, display: 'flex', alignItems: 'center' }}>
                        <BlogPostLogo height={36} />
                    </Box>

                    {/* Center: Centered Navbar */}
                    <Stack justifyContent={'center'} width={'480px'}>
                        <Navbar />
                    </Stack>

                    {/* Right: Hamburger / Options */}
                    <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'flex-end'} width={180}>
                        <Box
                            onClick={handleOpenMenu}
                            sx={{
                                width: 40,
                                height: 40,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '12px',
                                cursor: 'pointer',
                                color: darkMode ? '#888' : '#777',
                                transition: 'all 0.18s ease',
                                '&:hover': {
                                    color: darkMode ? '#fff' : '#000',
                                    bgcolor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                                },
                            }}
                        >
                            <GiHamburgerMenu size={20} />
                        </Box>
                    </Stack>
                </Stack>
            ) : (
                <>
                    {/* Mobile Top Header */}
                    <Stack
                        position={'sticky'}
                        top={0}
                        justifyContent={'space-between'}
                        flexDirection={'row'}
                        width={'100%'}
                        alignItems={'center'}
                        height={56}
                        px={2}
                        className="threads-header"
                        sx={{
                            zIndex: 100,
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <BlogPostLogo height={30} />

                        <Box
                            onClick={handleOpenMenu}
                            sx={{
                                width: 36,
                                height: 36,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                color: darkMode ? '#aaa' : '#666',
                                '&:hover': {
                                    color: darkMode ? '#fff' : '#000',
                                },
                            }}
                        >
                            <IoMenu size={28} />
                        </Box>
                    </Stack>

                    {/* Mobile Bottom Fixed Nav */}
                    <Stack
                        position={'fixed'}
                        bottom={0}
                        justifyContent={'center'}
                        flexDirection={'row'}
                        width={'100%'}
                        alignItems={'center'}
                        height={56}
                        className="threads-header"
                        sx={{
                            zIndex: 100,
                            borderTop: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Navbar />
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

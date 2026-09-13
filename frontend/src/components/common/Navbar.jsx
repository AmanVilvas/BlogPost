import React from 'react'
import { Stack, Box, Avatar, useMediaQuery } from '@mui/material'
import { GoHome, GoHomeFill, GoHeart, GoHeartFill } from "react-icons/go"
import { IoSearch } from "react-icons/io5"
import { TbSquarePlus } from "react-icons/tb"
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addPostModel } from '../../redux/slice'
import { useGetNotificationsQuery } from '../../redux/service'

function Navbar() {
    const dispatch = useDispatch()
    const { darkMode, myInfo } = useSelector((state) => state.service)
    const _700 = useMediaQuery('(min-width:700px)')

    const { data: notifData } = useGetNotificationsQuery(undefined, {
        pollingInterval: 5000,
        skip: !myInfo
    })
    const hasUnread = notifData?.notifications?.some(n => !n.read)

    const handleAddPost = () => dispatch(addPostModel(true))

    const activeColor = darkMode ? '#ffffff' : '#000000'
    const inactiveColor = darkMode ? '#686868' : '#999999'
    const iconSize = _700 ? 28 : 25

    const getPillStyle = (isActive) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: _700 ? '10px 28px' : '8px 14px',
        borderRadius: '12px',
        color: isActive ? activeColor : inactiveColor,
        backgroundColor: 'transparent',
        transition: 'all 0.18s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
            color: activeColor,
        },
        '&:active': {
            transform: 'scale(0.92)',
        },
    })

    return (
        <Stack
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-around'}
            width={'100%'}
            maxWidth={_700 ? 460 : '100%'}
            mx={'auto'}
        >
            {/* Home */}
            <NavLink to={'/'} style={{ textDecoration: 'none' }}>
                {({ isActive }) => (
                    <Box sx={getPillStyle(isActive)} title="Home">
                        {isActive ? <GoHomeFill size={iconSize} /> : <GoHome size={iconSize} />}
                    </Box>
                )}
            </NavLink>

            {/* Search */}
            <NavLink to={'/search'} style={{ textDecoration: 'none' }}>
                {({ isActive }) => (
                    <Box sx={getPillStyle(isActive)} title="Search">
                        <IoSearch size={iconSize} style={{ strokeWidth: isActive ? 2.5 : 1.5 }} />
                    </Box>
                )}
            </NavLink>

            {/* Create Post */}
            <Box
                sx={getPillStyle(false)}
                onClick={handleAddPost}
                title="Create Thread"
            >
                <TbSquarePlus size={iconSize} />
            </Box>

            {/* Activity / Heart */}
            <NavLink to={'/activity'} style={{ textDecoration: 'none' }} className={hasUnread ? 'unread-shake' : ''}>
                {({ isActive }) => (
                    <Box sx={getPillStyle(isActive)} title="Activity">
                        {isActive || hasUnread ? (
                            <GoHeartFill size={iconSize} style={{ color: hasUnread ? '#ff3040' : undefined }} />
                        ) : (
                            <GoHeart size={iconSize} />
                        )}
                    </Box>
                )}
            </NavLink>

            {/* Profile */}
            <NavLink to={`/profile/threads/${myInfo?._id}`} style={{ textDecoration: 'none' }}>
                {({ isActive }) => (
                    <Box sx={getPillStyle(isActive)} title="Profile">
                        {myInfo?.profilePic ? (
                            <Avatar
                                src={myInfo.profilePic}
                                alt={myInfo.userName || 'Profile'}
                                sx={{
                                    width: _700 ? 27 : 24,
                                    height: _700 ? 27 : 24,
                                    border: isActive
                                        ? `2px solid ${activeColor}`
                                        : `1.5px solid transparent`,
                                    transition: 'border-color 0.2s',
                                }}
                            />
                        ) : (
                            <Box
                                sx={{
                                    width: _700 ? 27 : 24,
                                    height: _700 ? 27 : 24,
                                    borderRadius: '50%',
                                    border: isActive ? `2px solid ${activeColor}` : `1.5px solid ${inactiveColor}`,
                                    bgcolor: darkMode ? '#282828' : '#e5e5e5',
                                }}
                            />
                        )}
                    </Box>
                )}
            </NavLink>
        </Stack>
    )
}

export default Navbar

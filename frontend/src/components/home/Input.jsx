import React from 'react'
import { Stack, Typography, Avatar, Box, useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addPostModel } from '../../redux/slice'
import { useGuestAccess } from '../common/GuestAccess'
import { useLocation } from 'react-router-dom'

function Input() {
    const dispatch = useDispatch()
    const { requestAccount } = useGuestAccess()
    const guest = useLocation().pathname.startsWith('/guest')
    const { myInfo, darkMode } = useSelector(state => state.service)
    const handleAddPost = () => guest ? requestAccount('create a post') : dispatch(addPostModel(true))
    const _700 = useMediaQuery('(min-width:700px)')

    if (!_700) return null

    return (
        <Box
            onClick={handleAddPost}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2.5,
                py: 2,
                mb: 1.5,
                width: '100%',
                bgcolor: darkMode ? '#141414' : '#ffffff',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '16px',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                '&:hover': {
                    bgcolor: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
                    borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
                    '& .threads-post-hint': {
                        color: darkMode ? '#fff' : '#000',
                    },
                },
            }}
        >
            <Stack flexDirection={'row'} alignItems={'center'} gap={1.5} flex={1}>
                <Avatar
                    src={myInfo?.profilePic || ''}
                    alt={myInfo?.userName}
                    sx={{
                        width: 38,
                        height: 38,
                        border: '1px solid',
                        borderColor: 'divider',
                    }}
                />
                <Typography
                    fontSize={'0.92rem'}
                    sx={{
                        color: 'text.secondary',
                        userSelect: 'none',
                        letterSpacing: '-0.01em',
                    }}
                >
                    What's new?
                </Typography>
            </Stack>

            <Box
                className="threads-post-hint"
                sx={{
                    px: 2,
                    py: 0.6,
                    borderRadius: '9999px',
                    border: '1px solid',
                    borderColor: 'divider',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: 'text.secondary',
                    bgcolor: darkMode ? '#1e1e1e' : '#f5f5f5',
                    transition: 'all 0.18s ease',
                    userSelect: 'none',
                }}
            >
                Post
            </Box>
        </Box>
    )
}

export default Input

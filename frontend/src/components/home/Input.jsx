import React from 'react'
import { Stack, Typography, Avatar, Box, useMediaQuery } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { addPostModel } from '../../redux/slice'

function Input() {
    const dispatch = useDispatch()
    const { myInfo, darkMode } = useSelector(state => state.service)
    const handleAddPost = () => dispatch(addPostModel(true))
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
                px: 2,
                py: 1.5,
                width: '600px',
                mx: 'auto',
                borderBottom: '1px solid',
                borderColor: 'divider',
                cursor: 'pointer',
                '&:hover .post-btn': { color: darkMode ? '#fff' : '#000' },
            }}
        >
            <Stack flexDirection={'row'} alignItems={'center'} gap={1.5}>
                <Avatar
                    src={myInfo?.profilePic || ''}
                    alt={myInfo?.userName}
                    sx={{ width: 38, height: 38 }}
                />
                <Typography
                    fontSize={'0.95rem'}
                    sx={{ color: darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)', userSelect: 'none' }}
                >
                    Start your thread…
                </Typography>
            </Stack>
            <Typography
                className="post-btn"
                fontSize={'0.9rem'}
                fontWeight={600}
                sx={{
                    color: darkMode ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)',
                    transition: 'color 0.2s',
                    userSelect: 'none',
                }}
            >
                Post
            </Typography>
        </Box>
    )
}

export default Input

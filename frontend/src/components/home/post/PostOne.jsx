import React from 'react'
import { Stack, Avatar, Box, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostOne({ e, guest = false }) {
    const _700 = useMediaQuery('(min-width:700px)')
    const { darkMode } = useSelector(state => state.service)

    const avatarSize = _700 ? 38 : 34

    return (
        <Stack
            flexDirection={'column'}
            alignItems={'center'}
            sx={{ minWidth: avatarSize, pt: 0.2 }}
        >
            {/* Author Avatar */}
            <Link to={`${guest ? '/guest' : ''}/profile/threads/${e?.admin?._id}`} style={{ textDecoration: 'none' }}>
                <Avatar
                    alt={e?.admin?.userName}
                    src={e?.admin?.profilePic || ''}
                    sx={{
                        width: avatarSize,
                        height: avatarSize,
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'opacity 0.15s ease',
                        '&:hover': {
                            opacity: 0.85,
                        },
                    }}
                />
            </Link>

            {/* Continuous Vertical Thread Line */}
            <Box
                sx={{
                    width: '2px',
                    flex: 1,
                    minHeight: 24,
                    my: 1,
                    bgcolor: darkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.12)',
                    borderRadius: 2,
                }}
            />

            {/* Stacked Commenter Avatars */}
            {e?.comments?.length > 0 && (
                <Stack
                    direction="row"
                    alignItems="center"
                    sx={{
                        position: 'relative',
                        height: 20,
                        '& .MuiAvatar-root': {
                            width: 18,
                            height: 18,
                            border: '1.5px solid',
                            borderColor: 'background.default',
                            marginLeft: '-6px',
                            '&:first-of-type': {
                                marginLeft: 0,
                            },
                        },
                    }}
                >
                    {e.comments.slice(0, 2).map((c, i) => (
                        <Avatar
                            key={c?._id || i}
                            src={c?.admin?.profilePic}
                            alt={c?.admin?.userName || 'User'}
                        />
                    ))}
                </Stack>
            )}
        </Stack>
    )
}

export default PostOne

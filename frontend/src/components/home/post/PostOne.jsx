import React from 'react'
import { Stack, Avatar, useMediaQuery } from '@mui/material'
import { Link } from 'react-router-dom'

function PostOne({ e }) {
    const _700 = useMediaQuery('(min-width:700px)')

    return (
        <Stack
            flexDirection={'column'}
            alignItems={'center'}
            gap={1}
            sx={{ minWidth: _700 ? 44 : 36, mt: 0.5 }}
        >
            {/* Profile picture - no badge, no + icon */}
            <Link to={`/profile/threads/${e?.admin?._id}`}>
                <Avatar
                    alt={e?.admin?.userName}
                    src={e?.admin?.profilePic}
                    sx={{
                        width: _700 ? 36 : 28,
                        height: _700 ? 36 : 28,
                        border: '2px solid',
                        borderColor: 'divider',
                    }}
                />
            </Link>

            {/* Clean vertical thread line - no Stepper, no blue color */}
            <Box
                sx={{
                    width: '1.5px',
                    flex: 1,
                    minHeight: 40,
                    bgcolor: 'divider',
                    borderRadius: 4,
                    opacity: 0.5,
                }}
            />

            {/* Small commenter avatars at the bottom - only if comments exist */}
            {e?.comments?.length > 0 && (
                <Stack
                    direction="row"
                    sx={{
                        '& .MuiAvatar-root': {
                            width: _700 ? 20 : 16,
                            height: _700 ? 20 : 16,
                            fontSize: 8,
                            border: '1.5px solid',
                            borderColor: 'background.default',
                            marginLeft: '-6px',
                        },
                    }}
                >
                    {e.comments.slice(0, 2).map((c, i) => (
                        <Avatar
                            key={i}
                            src={c?.admin?.profilePic}
                            alt={c?.admin?.userName}
                        />
                    ))}
                </Stack>
            )}
        </Stack>
    )
}

// Need Box from MUI
import { Box } from '@mui/material'

export default PostOne
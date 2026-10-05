import React from 'react'
import { Stack, Box, useMediaQuery } from '@mui/material'
import PostOne from './post/PostOne'
import PostTwo from './post/PostTwo'
import { BsThreeDots } from "react-icons/bs"
import { AiOutlineRetweet } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { addPostID, toggleMyMenu } from '../../redux/slice'
import { useLocation, Link } from 'react-router-dom'

// Returns a short relative time string like "2h", "3d", "just now"
function timeAgo(dateStr) {
    if (!dateStr) return ''
    const now = Date.now()
    const then = new Date(dateStr).getTime()
    const diff = Math.floor((now - then) / 1000)
    if (diff < 60) return 'just now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d`
    return `${Math.floor(diff / 2592000)}mo`
}

function Post({ e }) {
    const { darkMode, myInfo } = useSelector(state => state.service)
    const dispatch = useDispatch()
    const guest = useLocation().pathname.startsWith('/guest')
    const _700 = useMediaQuery('(min-width:700px)')

    const isRepostWrapper = !!e?.repostOf
    const actualPost = isRepostWrapper ? e.repostOf : e
    const reposterName = isRepostWrapper ? e.admin?.userName : null

    const isAdmin = actualPost?.admin?._id === myInfo?._id

    const handleOpenMenu = (event) => {
        dispatch(addPostID(actualPost._id))
        dispatch(toggleMyMenu(event.currentTarget))
    }

    return (
        <Box
            className="threads-card"
            sx={{
                width: '100%',
                px: _700 ? 2.5 : 2,
                py: 2.5,
                position: 'relative',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: _700 ? '20px' : 0,
                mb: _700 ? 1.5 : 0,
                bgcolor: 'background.paper',
                boxShadow: _700 ? '0 8px 30px rgba(20, 20, 30, 0.035)' : 'none',
            }}
        >
            {isRepostWrapper && (
                <Stack flexDirection={'row'} alignItems={'center'} gap={1} mb={1} ml={_700 ? 6 : 5}>
                    <AiOutlineRetweet size={15} color={darkMode ? '#888' : '#777'} />
                    <Box
                        component="span"
                        sx={{
                            fontSize: '0.82rem',
                            color: 'text.secondary',
                            fontWeight: 600,
                            letterSpacing: '-0.01em',
                        }}
                    >
                        {reposterName} reposted
                    </Box>
                </Stack>
            )}

            <Stack flexDirection={'row'} gap={1.8} alignItems={'stretch'}>
                {/* Left column: Avatar + Thread Connector Line */}
                <PostOne e={actualPost} guest={guest} />

                {/* Right column: Content & Actions */}
                <Stack flex={1} minWidth={0} gap={0.5}>
                    {/* Header: Username + Time + Options */}
                    <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Box sx={{ minWidth: 0 }}>
                            <Link to={`${guest ? '/guest' : ''}/profile/threads/${actualPost?.admin?._id}`} className="post-author-link">
                            <Box
                                component="span"
                                sx={{
                                    fontWeight: 700,
                                    fontSize: '0.94rem',
                                    color: 'text.primary',
                                    cursor: 'pointer',
                                    letterSpacing: '-0.015em',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    },
                                }}
                            >
                                {actualPost?.admin?.userName}
                            </Box>
                            </Link>
                        </Box>

                        <Stack flexDirection={'row'} alignItems={'center'} gap={1.2}>
                            <Box
                                component="span"
                                sx={{
                                    fontSize: '0.82rem',
                                    color: 'text.secondary',
                                    fontWeight: 400,
                                }}
                            >
                                {timeAgo(actualPost?.createdAt)}
                            </Box>

                            <Box
                                onClick={isAdmin ? handleOpenMenu : undefined}
                                sx={{
                                    cursor: isAdmin ? 'pointer' : 'default',
                                    color: 'text.secondary',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 28,
                                    height: 28,
                                    borderRadius: '50%',
                                    transition: 'all 0.15s ease',
                                    '&:hover': isAdmin ? {
                                        color: darkMode ? '#fff' : '#000',
                                        bgcolor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                                    } : {},
                                }}
                            >
                                <BsThreeDots size={16} />
                            </Box>
                        </Stack>
                    </Stack>

                    {/* Post Content & Interactive Controls */}
                    <PostTwo e={actualPost} guest={guest} />
                </Stack>
            </Stack>
        </Box>
    )
}

export default Post

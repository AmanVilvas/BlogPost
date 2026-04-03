import React from 'react'
import { Stack, Box, useMediaQuery } from '@mui/material'
import PostOne from './post/PostOne'
import PostTwo from './post/PostTwo'
import { BsThreeDots } from "react-icons/bs"
import { AiOutlineRetweet } from "react-icons/ai"
import { useDispatch, useSelector } from 'react-redux'
import { addPostID, toggleMyMenu } from '../../redux/slice'

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
    const _700 = useMediaQuery('(min-width:700px)')

    const isRepostWrapper = !!e.repostOf
    const actualPost = isRepostWrapper ? e.repostOf : e
    const reposterName = isRepostWrapper ? e.admin?.userName : null

    const isAdmin = actualPost?.admin?._id === myInfo?._id

    const handleOpenMenu = (event) => {
        dispatch(addPostID(actualPost._id))
        dispatch(toggleMyMenu(event.currentTarget))
    }

    const mutedColor = darkMode ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)'

    return (
        <Box
            sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
                px: _700 ? 2 : 1.5,
                py: 1.5,
                mx: 'auto',
                width: _700 ? '600px' : '100%',
                maxWidth: '100%',
                '&:hover': {
                    bgcolor: darkMode ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.02)',
                },
                transition: 'background-color 0.2s ease',
                cursor: 'default',
            }}
        >
            {isRepostWrapper && (
                <Stack flexDirection={'row'} alignItems={'center'} gap={1} mb={1} ml={_700 ? 5 : 4}>
                    <AiOutlineRetweet size={16} color={mutedColor} />
                    <Box component="span" sx={{ fontSize: '0.85rem', color: mutedColor, fontWeight: 500 }}>
                        {reposterName} reposted
                    </Box>
                </Stack>
            )}
            <Stack flexDirection={'row'} gap={1.5} alignItems={'flex-start'}>

                {/* Left column: avatar + thread line + reply avatars */}
                <PostOne e={actualPost} />

                {/* Right column: content */}
                <Stack flex={1} minWidth={0} gap={0.25}>
                    {/* Header row: username + time + dots */}
                    <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} mb={0.25}>
                        <Stack direction="row" alignItems="center" gap={0.75}>
                            {/* username shown in PostTwo */}
                        </Stack>
                        <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
                            <Box
                                component="span"
                                sx={{ fontSize: '0.78rem', color: mutedColor }}
                            >
                                {timeAgo(actualPost?.createdAt)}
                            </Box>
                            <Box
                                onClick={isAdmin ? handleOpenMenu : undefined}
                                sx={{
                                    cursor: isAdmin ? 'pointer' : 'default',
                                    color: mutedColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: '2px',
                                    borderRadius: '50%',
                                    '&:hover': isAdmin ? { color: darkMode ? '#fff' : '#000', bgcolor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)' } : {},
                                    transition: 'all 0.2s',
                                }}
                            >
                                <BsThreeDots size={18} />
                            </Box>
                        </Stack>
                    </Stack>

                    {/* Post content: username, text, media, actions */}
                    <PostTwo e={actualPost} />
                </Stack>
            </Stack>
        </Box>
    )
}

export default Post
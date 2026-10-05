import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Stack, Avatar, Typography, Box, useMediaQuery } from '@mui/material'
import { useGetNotificationsQuery, useMarkNotificationsReadMutation } from '../../redux/service'
import Loader from '../../components/common/Loader'
import { FaHeart, FaComment } from 'react-icons/fa6'
import { AiOutlineRetweet } from 'react-icons/ai'
import { IoPerson } from 'react-icons/io5'
import { useSelector } from 'react-redux'

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

function Notifications() {
    const { data, isLoading } = useGetNotificationsQuery()
    const [markAsRead] = useMarkNotificationsReadMutation()
    const { darkMode } = useSelector(state => state.service)
    const _700 = useMediaQuery('(min-width:700px)')

    useEffect(() => {
        if (data?.notifications?.some(n => !n.read)) {
            markAsRead()
        }
    }, [data, markAsRead])

    if (isLoading) return <Loader />

    const notifications = data?.notifications || []

    const getBadgeIcon = (type) => {
        switch (type) {
            case 'like':
                return { icon: <FaHeart size={10} color="#ffffff" />, bg: '#ff3040' }
            case 'repost':
                return { icon: <AiOutlineRetweet size={11} color="#ffffff" />, bg: '#00ba7c' }
            case 'reply':
                return { icon: <FaComment size={9} color="#ffffff" />, bg: '#0095f6' }
            case 'follow':
                return { icon: <IoPerson size={10} color="#ffffff" />, bg: '#8b5cf6' }
            default:
                return { icon: <FaHeart size={10} color="#ffffff" />, bg: '#ff3040' }
        }
    }

    return (
        <Box sx={{ width: '100%', pb: 8 }}>
            <Box px={_700 ? 3 : 2} py={2} borderBottom="1px solid" borderColor="divider">
                <Typography variant="h5" fontWeight={800} letterSpacing="-0.03em">
                    Activity
                </Typography>
            </Box>

            {notifications.length === 0 ? (
                <Box textAlign="center" py={8}>
                    <Typography variant="h6" fontWeight={600} mb={1}>
                        No activity yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        When someone likes your post or follows you, it’ll show up here.
                    </Typography>
                </Box>
            ) : (
                notifications.map(notif => {
                    const badge = getBadgeIcon(notif.type)
                    return (
                        <Box
                            key={notif._id}
                            sx={{
                                display: 'flex',
                                gap: 2,
                                px: _700 ? 3 : 2,
                                py: 2,
                                borderBottom: '1px solid',
                                borderColor: 'divider',
                                bgcolor: notif.read ? 'transparent' : (darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'),
                                transition: 'background-color 0.15s ease',
                                '&:hover': {
                                    bgcolor: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
                                },
                            }}
                        >
                            {/* Avatar with Type Badge */}
                            <Box sx={{ position: 'relative', flexShrink: 0 }}>
                                <Link to={`/profile/threads/${notif.sender?._id}`}>
                                    <Avatar
                                        src={notif.sender?.profilePic || ''}
                                        alt={notif.sender?.userName}
                                        sx={{ width: 42, height: 42, border: '1px solid', borderColor: 'divider' }}
                                    />
                                </Link>
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: -2,
                                        right: -2,
                                        width: 20,
                                        height: 20,
                                        borderRadius: '50%',
                                        bgcolor: badge.bg,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '2px solid',
                                        borderColor: 'background.default',
                                    }}
                                >
                                    {badge.icon}
                                </Box>
                            </Box>

                            {/* Activity Details */}
                            <Box flex={1} minWidth={0}>
                                <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={1}>
                                    <Typography variant="body2" sx={{ lineHeight: 1.4, wordBreak: 'break-word' }}>
                                        <Link
                                            to={`/profile/threads/${notif.sender?._id}`}
                                            style={{ fontWeight: 700, color: 'inherit', textDecoration: 'none' }}
                                        >
                                            {notif.sender?.userName}
                                        </Link>
                                        <Box component="span" sx={{ color: 'text.secondary', ml: 0.8 }}>
                                            {notif.type === 'like' && 'liked your post'}
                                            {notif.type === 'repost' && 'reposted your post'}
                                            {notif.type === 'reply' && 'replied to your post'}
                                            {notif.type === 'follow' && 'started following you'}
                                        </Box>
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0, fontSize: '0.8rem' }}>
                                        {timeAgo(notif.createdAt)}
                                    </Typography>
                                </Stack>

                                {/* Post preview card */}
                                {(notif.type === 'like' || notif.type === 'repost' || notif.type === 'reply') && notif.post && (
                                    <Link
                                        to={`/post/${notif.post._id}`}
                                        style={{ textDecoration: 'none', color: 'inherit' }}
                                    >
                                        <Box
                                            sx={{
                                                mt: 1,
                                                p: 1.5,
                                                borderRadius: '12px',
                                                bgcolor: darkMode ? '#181818' : '#f5f5f5',
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                '&:hover': {
                                                    borderColor: 'text.secondary',
                                                },
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: '0.85rem',
                                                }}
                                            >
                                                {notif.post.text || 'View attached post →'}
                                            </Typography>
                                        </Box>
                                    </Link>
                                )}
                            </Box>
                        </Box>
                    )
                })
            )}
        </Box>
    )
}

export default Notifications

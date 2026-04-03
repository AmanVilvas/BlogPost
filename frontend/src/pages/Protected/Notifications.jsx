import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Stack, Avatar, Typography, Box } from '@mui/material'
import { useGetNotificationsQuery, useMarkNotificationsReadMutation } from '../../redux/service'
import Loader from '../../components/common/Loader'

function timeAgo(dateStr) {
    if (!dateStr) return ''
    const now = Date.now()
    const then = new Date(dateStr).getTime()
    const diff = Math.floor((now - then) / 1000)
    if (diff < 60) return 'now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d`
    return `${Math.floor(diff / 2592000)}mo`
}

function Notifications() {
    const { data, isLoading } = useGetNotificationsQuery()
    const [markAsRead] = useMarkNotificationsReadMutation()

    useEffect(() => {
        // Mark as read when entering the page
        if (data?.notifications?.some(n => !n.read)) {
            markAsRead()
        }
    }, [data, markAsRead])

    if (isLoading) return <Loader />

    const notifications = data?.notifications || []

    return (
        <Stack paddingBottom={10} width="100%" maxWidth={640} mx="auto">
            <Typography variant="h5" fontWeight={700} padding={2} borderBottom="1px solid var(--border)">
                Activity
            </Typography>

            {notifications.length === 0 ? (
                <Typography textAlign="center" color="text.secondary" padding={4}>
                    No activity yet.
                </Typography>
            ) : (
                notifications.map(notif => (
                    <Box 
                        key={notif._id} 
                        sx={{
                            display: 'flex',
                            gap: 2,
                            padding: 2,
                            borderBottom: '1px solid var(--border)',
                            backgroundColor: notif.read ? 'transparent' : 'var(--surface-2)',
                            transition: 'background 0.3s'
                        }}
                    >
                        <Link to={`/profile/threads/${notif.sender?._id}`}>
                            <Avatar src={notif.sender?.profilePic} alt={notif.sender?.userName} sx={{ width: 44, height: 44 }} />
                        </Link>
                        
                        <Box flex={1}>
                            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={0.5}>
                                <Typography variant="body1">
                                    <Link to={`/profile/threads/${notif.sender?._id}`} style={{ fontWeight: 600, color: 'inherit', textDecoration: 'none' }}>
                                        {notif.sender?.userName}
                                    </Link>
                                    <span style={{ color: 'var(--muted)', marginLeft: 6 }}>
                                        {notif.type === 'like' && 'liked your post'}
                                        {notif.type === 'repost' && 'reposted your post'}
                                        {notif.type === 'reply' && 'replied to you'}
                                        {notif.type === 'follow' && 'started following you'}
                                    </span>
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {timeAgo(notif.createdAt)}
                                </Typography>
                            </Stack>
                            
                            {/* If there is a post attached, show a snippet or link */}
                            {(notif.type === 'like' || notif.type === 'repost' || notif.type === 'reply') && notif.post && (
                                <Link 
                                    to={`/post/${notif.post._id}`} 
                                    style={{ 
                                        display: 'block', 
                                        marginTop: '4px',
                                        color: '#3b82f6', 
                                        textDecoration: 'none', 
                                        fontSize: '0.9rem' 
                                    }}
                                >
                                    {notif.post.text ? notif.post.text : 'View post →'}
                                </Link>
                            )}
                        </Box>
                    </Box>
                ))
            )}
        </Stack>
    )
}

export default Notifications

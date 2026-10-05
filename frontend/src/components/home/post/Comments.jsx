import React, { useState } from 'react'
import { useMediaQuery, Avatar, Stack, Typography, Box, Menu, MenuItem } from '@mui/material'
import { BsThreeDots } from 'react-icons/bs'
import { MdDeleteOutline } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDeleteCommentMutation } from '../../../redux/service'

function timeAgo(dateStr) {
    if (!dateStr) return ''
    const now = Date.now()
    const then = new Date(dateStr).getTime()
    const diff = Math.floor((now - then) / 1000)
    if (diff < 60) return 'just now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`
    return `${Math.floor(diff / 86400)}d`
}

function Comments({ comment, postId, guest = false }) {
    const _700 = useMediaQuery('(min-width:700px)')
    const [menuAnchorEl, setMenuAnchorEl] = useState(null)
    const { darkMode, myInfo } = useSelector(state => state.service)

    const [deleteComment] = useDeleteCommentMutation()

    const handleOpenMenu = (event) => {
        setMenuAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setMenuAnchorEl(null)
    }

    const handleDeleteComment = async () => {
        handleClose()
        try {
            await deleteComment({ postId, id: comment._id }).unwrap()
        } catch (err) {
            console.error('Delete comment failed:', err)
        }
    }

    const isMyComment = myInfo?._id === comment?.admin?._id

    return (
        <Box
            sx={{
                py: 2,
                px: _700 ? 3 : 2,
                borderBottom: '1px solid',
                borderColor: 'divider',
                transition: 'background-color 0.15s ease',
                '&:hover': {
                    bgcolor: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)',
                },
            }}
        >
            <Stack flexDirection={'row'} gap={1.8} alignItems={'flex-start'}>
                {/* Commenter Avatar */}
                <Link to={`${guest ? '/guest' : ''}/profile/threads/${comment?.admin?._id}`} style={{ textDecoration: 'none' }}>
                    <Avatar
                        src={comment?.admin?.profilePic || ''}
                        alt={comment?.admin?.userName}
                        sx={{
                            width: _700 ? 36 : 32,
                            height: _700 ? 36 : 32,
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    />
                </Link>

                {/* Comment Content */}
                <Stack flex={1} minWidth={0} gap={0.4}>
                    <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Link to={`${guest ? '/guest' : ''}/profile/threads/${comment?.admin?._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography
                                fontWeight={700}
                                fontSize={'0.92rem'}
                                sx={{
                                    letterSpacing: '-0.015em',
                                    '&:hover': { textDecoration: 'underline' },
                                }}
                            >
                                {comment?.admin?.userName}
                            </Typography>
                        </Link>

                        <Stack flexDirection={'row'} gap={1} alignItems={'center'}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                                {timeAgo(comment?.createdAt)}
                            </Typography>

                            {isMyComment && (
                                <Box
                                    onClick={handleOpenMenu}
                                    sx={{
                                        cursor: 'pointer',
                                        color: 'text.secondary',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 26,
                                        height: 26,
                                        borderRadius: '50%',
                                        '&:hover': {
                                            color: darkMode ? '#fff' : '#000',
                                            bgcolor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                                        },
                                    }}
                                >
                                    <BsThreeDots size={15} />
                                </Box>
                            )}
                        </Stack>
                    </Stack>

                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.primary',
                            lineHeight: 1.45,
                            wordBreak: 'break-word',
                            whiteSpace: 'pre-wrap',
                            fontSize: '0.9rem',
                        }}
                    >
                        {comment?.text}
                    </Typography>
                </Stack>
            </Stack>

            <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        bgcolor: darkMode ? '#1e1e1e' : '#ffffff',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: '14px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                    },
                }}
            >
                <MenuItem onClick={handleDeleteComment} sx={{ color: '#ff3040', fontSize: '0.9rem', fontWeight: 600 }}>
                    <MdDeleteOutline size={18} style={{ marginRight: 8 }} />
                    Delete reply
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default Comments

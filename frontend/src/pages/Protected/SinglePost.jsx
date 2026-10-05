import React, { useState } from 'react'
import { Button, Stack, Typography, Box, Avatar, useMediaQuery } from '@mui/material'
import Post from '../../components/home/Post'
import Comments from '../../components/home/post/Comments'
import { useSelector } from 'react-redux'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useSinglePostQuery, useAddCommentMutation } from '../../redux/service'
import Loader from '../../components/common/Loader'
import { IoArrowBack } from 'react-icons/io5'
import { useGuestAccess } from '../../components/common/GuestAccess'

function SinglePost() {
    const { id } = useParams()
    const navigate = useNavigate()
    const guest = useLocation().pathname.startsWith('/guest')
    const { requestAccount } = useGuestAccess()
    const [comment, setComment] = useState('')
    const { darkMode, myInfo } = useSelector(state => state.service)
    const _700 = useMediaQuery('(min-width:700px)')

    const { data, isLoading, isError } = useSinglePostQuery(id)
    const post = data?.post

    const [addComment, { isLoading: isCommenting }] = useAddCommentMutation()

    const handleComment = async () => {
        if (guest || !myInfo) return requestAccount('comment on posts')
        if (!comment.trim() || !id) return
        try {
            await addComment({ id, text: comment }).unwrap()
            setComment('')
        } catch (err) {
            console.error('Comment failed:', err)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleComment()
        }
    }

    if (isLoading) return <Loader />
    if (isError || !post) {
        return (
            <Box textAlign="center" py={8}>
                <Typography variant="h6" fontWeight={700} mb={1}>
                    Post not found
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    This post may have been removed or the link is broken.
                </Typography>
                <Button className="threads-outline-btn" sx={{ mt: 3 }} onClick={() => navigate(-1)}>
                    Go back
                </Button>
            </Box>
        )
    }

    return (
        <Box sx={{ width: '100%', pb: 6 }}>
            {/* Top Navigation Bar with Back Button */}
            <Stack
                direction="row"
                alignItems="center"
                spacing={1.5}
                px={_700 ? 2 : 1}
                py={1.5}
                borderBottom="1px solid"
                borderColor="divider"
            >
                <Box
                    onClick={() => navigate(-1)}
                    sx={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        transition: 'background-color 0.15s ease',
                        '&:hover': {
                            bgcolor: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                        },
                    }}
                >
                    <IoArrowBack size={20} />
                </Box>
                <Typography variant="h6" fontWeight={700} fontSize="1.05rem" letterSpacing="-0.02em">
                    Post
                </Typography>
            </Stack>

            {/* The Main Post */}
            <Post e={post} />

            {/* Comments / Replies Section */}
            <Box sx={{ mt: 1 }}>
                {post.comments?.length > 0 ? (
                    post.comments.map((c) => (
                        <Comments key={c._id} comment={c} postId={post._id} guest={guest} />
                    ))
                ) : (
                    <Typography
                        variant="body2"
                        textAlign="center"
                        color="text.secondary"
                        py={4}
                    >
                        No replies yet. Be the first to start the conversation!
                    </Typography>
                )}
            </Box>

            {/* Sticky/Docked Reply Composer */}
            <Box
                sx={{
                    position: 'sticky',
                    bottom: !_700 ? 56 : 0,
                    bgcolor: 'background.default',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    px: 2,
                    py: 1.5,
                    zIndex: 20,
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Avatar
                        src={myInfo?.profilePic || ''}
                        alt={myInfo?.userName}
                        sx={{ width: 34, height: 34, border: '1px solid', borderColor: 'divider' }}
                    />
                    <Box
                        component="textarea"
                        rows={1}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={guest ? 'Create an account to join the conversation' : `Reply to ${post.admin?.userName || 'post'}...`}
                        readOnly={guest}
                        onClick={guest ? () => requestAccount('comment on posts') : undefined}
                        sx={{
                            flex: 1,
                            border: 'none',
                            outline: 'none',
                            bgcolor: darkMode ? '#1a1a1a' : '#f5f5f5',
                            color: 'text.primary',
                            px: 2,
                            py: 1,
                            borderRadius: '20px',
                            fontFamily: 'inherit',
                            fontSize: '0.9rem',
                            resize: 'none',
                            maxHeight: 100,
                            '&::placeholder': {
                                color: 'text.secondary',
                            },
                        }}
                    />
                    <Button
                        className="threads-pill-btn"
                        onClick={handleComment}
                        disabled={!guest && (isCommenting || !comment.trim())}
                        sx={{ minWidth: 68 }}
                    >
                        {guest ? 'Join in' : isCommenting ? '...' : 'Post'}
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}

export default SinglePost

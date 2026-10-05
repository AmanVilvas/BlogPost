import React, { useState, useEffect } from 'react'
import { Stack, Typography, Box, useMediaQuery } from '@mui/material'
import { FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa6"
import { AiOutlineRetweet } from "react-icons/ai"
import { IoPaperPlaneOutline } from "react-icons/io5"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLikePostMutation, useRepostMutation } from '../../../redux/service'
import { useGuestAccess } from '../../common/GuestAccess'

function PostTwo({ e, guest = false }) {
    const { darkMode, myInfo } = useSelector(state => state.service)
    const [likePost] = useLikePostMutation()
    const [repost] = useRepostMutation()
    const { requestAccount } = useGuestAccess()
    const _700 = useMediaQuery("(min-width:700px)")

    const isLikedInitial = e?.likes?.some(l => String(l._id || l) === String(myInfo?._id))
    const isRepostedInitial = myInfo?.reposts?.some(r => String(r._id || r) === String(e?._id))

    const [localLiked, setLocalLiked] = useState(isLikedInitial)
    const [localLikeCount, setLocalLikeCount] = useState(e?.likes?.length ?? 0)
    const [localReposted, setLocalReposted] = useState(isRepostedInitial)
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        setLocalLiked(isLikedInitial)
        setLocalLikeCount(e?.likes?.length ?? 0)
    }, [isLikedInitial, e?.likes?.length])

    useEffect(() => {
        setLocalReposted(isRepostedInitial)
    }, [isRepostedInitial])

    const handleLike = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        if (guest || !myInfo) return requestAccount('like posts')
        if (!e?._id) return
        setLocalLiked(prev => !prev)
        setLocalLikeCount(prev => localLiked ? prev - 1 : prev + 1)
        likePost(e._id)
    }

    const handleRepost = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        if (guest || !myInfo) return requestAccount('repost posts')
        if (!e?._id) return
        setLocalReposted(prev => !prev)
        repost(e._id)
    }

    const handleShare = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        const url = `${window.location.origin}/post/${e?._id}`
        navigator.clipboard?.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const iconSize = _700 ? 19 : 18

    return (
        <Stack flexDirection={'column'} gap={0.8} flex={1} minWidth={0} sx={{ mt: 0.2 }}>
            {/* Post Text */}
            <Link to={`${guest ? '/guest' : ''}/post/${e?._id}`} style={{ textDecoration: 'none' }}>
                <Typography
                    fontSize={_700 ? '0.94rem' : '0.88rem'}
                    sx={{
                        color: 'text.primary',
                        lineHeight: 1.5,
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap',
                        letterSpacing: '-0.01em',
                    }}
                >
                    {e?.text}
                </Typography>
            </Link>

            {/* Post Media Attachment */}
            {e?.media && (
                <Box
                    sx={{
                        mt: 0.5,
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: 'divider',
                        maxWidth: _700 ? '500px' : '100%',
                        bgcolor: darkMode ? '#181818' : '#fafafa',
                    }}
                >
                    <img
                        src={e.media}
                        alt="attachment"
                        loading="lazy"
                        style={{
                            width: '100%',
                            maxHeight: _700 ? 380 : 260,
                            objectFit: 'cover',
                            display: 'block',
                        }}
                    />
                </Box>
            )}

            {/* Post actions: like, reply, repost, share */}
            <Stack flexDirection={'row'} alignItems={'center'} gap={2} mt={0.5} sx={{ userSelect: 'none' }}>
                {/* Like Button */}
                <Box
                    className={`threads-action-btn ${localLiked ? 'liked-heart' : ''}`}
                    onClick={handleLike}
                    title={localLiked ? 'Unlike' : 'Like'}
                >
                    {localLiked ? (
                        <FaHeart size={iconSize} />
                    ) : (
                        <FaRegHeart size={iconSize} />
                    )}
                    {localLikeCount > 0 && (
                        <Typography
                            variant="caption"
                            sx={{
                                fontWeight: 500,
                                fontSize: '0.82rem',
                                color: localLiked ? 'var(--accent-heart)' : 'inherit',
                            }}
                        >
                            {localLikeCount}
                        </Typography>
                    )}
                </Box>

                {/* Comment Button */}
                <Link to={`${guest ? '/guest' : ''}/post/${e?._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Box className="threads-action-btn" title="Reply">
                        <FaRegComment size={iconSize} />
                        {(e?.comments?.length ?? 0) > 0 && (
                            <Typography variant="caption" sx={{ fontWeight: 500, fontSize: '0.82rem', color: 'inherit' }}>
                                {e.comments.length}
                            </Typography>
                        )}
                    </Box>
                </Link>

                {/* Repost Button */}
                <Box
                    className={`threads-action-btn ${localReposted ? 'reposted-icon' : ''}`}
                    onClick={handleRepost}
                    title={localReposted ? 'Remove repost' : 'Repost'}
                >
                    <AiOutlineRetweet size={iconSize + 2} />
                </Box>

                {/* Share Button */}
                <Box
                    className="threads-action-btn"
                    onClick={handleShare}
                    title={copied ? 'Link copied!' : 'Share'}
                >
                    <IoPaperPlaneOutline size={iconSize + 1} />
                    {copied && (
                        <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                            Copied!
                        </Typography>
                    )}
                </Box>
            </Stack>

            {/* Subtle Footer: "X likes · Y replies" if any */}
            {(localLikeCount > 0 || (e?.comments?.length ?? 0) > 0) && (
                <Stack direction="row" alignItems="center" spacing={0.8} sx={{ mt: 0.2 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.78rem' }}>
                        {e?.comments?.length > 0 && `${e.comments.length} ${e.comments.length === 1 ? 'reply' : 'replies'}`}
                        {e?.comments?.length > 0 && localLikeCount > 0 && ' · '}
                        {localLikeCount > 0 && `${localLikeCount} ${localLikeCount === 1 ? 'like' : 'likes'}`}
                    </Typography>
                </Stack>
            )}
        </Stack>
    )
}

export default PostTwo

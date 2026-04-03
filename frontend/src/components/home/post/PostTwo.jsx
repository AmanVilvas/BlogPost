import React from 'react'
import { Stack, Typography, Box, useMediaQuery } from '@mui/material'
import { AiOutlineLike, AiFillLike } from "react-icons/ai"
import { FaRegCommentDots } from "react-icons/fa6"
import { AiOutlineRetweet } from "react-icons/ai"
import { PiShareFat } from "react-icons/pi"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useLikePostMutation, useRepostMutation } from '../../../redux/service'

function PostTwo({ e }) {
    const { darkMode, myInfo } = useSelector(state => state.service)
    const [likePost] = useLikePostMutation()
    const [repost] = useRepostMutation()
    const _700 = useMediaQuery("(min-width:700px)")

    const isLikedInitial = e?.likes?.some(l => (l._id || l) === myInfo?._id)
    const isRepostedInitial = myInfo?.reposts?.some(r => (r._id || r) === e?._id)

    const [localLiked, setLocalLiked] = React.useState(isLikedInitial)
    const [localLikeCount, setLocalLikeCount] = React.useState(e?.likes?.length ?? 0)
    const [localReposted, setLocalReposted] = React.useState(isRepostedInitial)

    // Sync from server state if it changes
    React.useEffect(() => {
        setLocalLiked(isLikedInitial)
        setLocalLikeCount(e?.likes?.length ?? 0)
    }, [isLikedInitial, e?.likes?.length])

    React.useEffect(() => {
        setLocalReposted(isRepostedInitial)
    }, [isRepostedInitial])

    const handleLike = () => {
        if (!e?._id) return
        setLocalLiked(prev => !prev)
        setLocalLikeCount(prev => localLiked ? prev - 1 : prev + 1)
        likePost(e._id)
    }

    const handleRepost = () => {
        if (!e?._id) return
        setLocalReposted(prev => !prev)
        repost(e._id)
    }

    const iconSize = _700 ? 22 : 20
    const mutedColor = darkMode ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'

    return (
        <Stack flexDirection={'column'} gap={0.5} flex={1} minWidth={0}>

            {/* Username */}
            <Typography
                fontWeight={600}
                fontSize={_700 ? '0.95rem' : '0.88rem'}
                sx={{ color: darkMode ? '#fff' : '#0f0f0f', lineHeight: 1.3 }}
                noWrap
            >
                {e?.admin?.userName}
            </Typography>

            {/* Post text */}
            <Link to={`/post/${e?._id}`} style={{ textDecoration: 'none' }}>
                <Typography
                    fontSize={_700 ? '0.95rem' : '0.88rem'}
                    sx={{
                        color: darkMode ? 'rgba(255,255,255,0.85)' : 'rgba(0,0,0,0.85)',
                        lineHeight: 1.5,
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap',
                    }}
                >
                    {e?.text}
                </Typography>
            </Link>

            {/* Post image */}
            {e?.media && (
                <Box
                    sx={{
                        mt: 0.5,
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: 'divider',
                        maxWidth: _700 ? 440 : '100%',
                    }}
                >
                    <img
                        src={e.media}
                        alt="post media"
                        loading="lazy"
                        style={{
                            width: '100%',
                            maxHeight: _700 ? 300 : 220,
                            objectFit: 'cover',
                            display: 'block',
                        }}
                    />
                </Box>
            )}

            {/* Action icons */}
            <Stack flexDirection={'row'} gap={2} mt={0.5} alignItems={'center'}>
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={0.5}
                    sx={{ cursor: 'pointer', '&:hover': { color: 'crimson' }, color: localLiked ? 'crimson' : mutedColor, transition: 'color .2s' }}
                    onClick={handleLike}
                >
                    {localLiked
                        ? <AiFillLike size={iconSize} />
                        : <AiOutlineLike size={iconSize} />}
                    <Typography fontSize={'0.78rem'} color="inherit">{localLikeCount}</Typography>
                </Stack>

                <Link to={`/post/${e?._id}`} style={{ textDecoration: 'none' }}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        gap={0.5}
                        sx={{ cursor: 'pointer', color: mutedColor, '&:hover': { color: darkMode ? '#fff' : '#000' }, transition: 'color .2s' }}
                    >
                        <FaRegCommentDots size={iconSize} />
                        <Typography fontSize={'0.78rem'} color="inherit">{e?.comments?.length ?? 0}</Typography>
                    </Stack>
                </Link>

                <Stack
                    direction="row"
                    alignItems="center"
                    gap={0.5}
                    sx={{ cursor: 'pointer', color: localReposted ? '#22c55e' : mutedColor, '&:hover': { color: '#22c55e' }, transition: 'color .2s' }}
                    onClick={handleRepost}
                >
                    <AiOutlineRetweet size={iconSize} />
                </Stack>

                <Stack
                    direction="row"
                    alignItems="center"
                    gap={0.5}
                    sx={{ cursor: 'pointer', color: mutedColor, '&:hover': { color: darkMode ? '#fff' : '#000' }, transition: 'color .2s' }}
                >
                    <PiShareFat size={iconSize} />
                </Stack>
            </Stack>
        </Stack>
    )
}

export default PostTwo
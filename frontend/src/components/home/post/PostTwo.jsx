import React from 'react'
import { Stack, Typography, useMediaQuery } from '@mui/material'
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa6";
import { AiOutlineRetweet } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
// useLikePostMutation and useRepostMutation wired up below
import { useLikePostMutation, useRepostMutation } from '../../../redux/service'


function PostTwo({ e }) {


    const {darkMode, myInfo} = useSelector(state=>state.service)

    // API mutations
    const [likePost] = useLikePostMutation()
    const [repost] = useRepostMutation()

    const _700 = useMediaQuery("(min-width:700px)")
    const _300 = useMediaQuery("(min-width:300px)")
    const _400 = useMediaQuery("(min-width:400px)")
    const _500 = useMediaQuery("(min-width:500px)")

    // Check if currently logged-in user has liked this post
    const isLiked = e?.likes?.some(l => (l._id || l) === myInfo?._id)
    // Check if currently logged-in user has reposted this post
    const isReposted = myInfo?.reposts?.some(r => (r._id || r) === e?._id)

    const handleLike = () => {
        if (e?._id) likePost(e._id)
    }

    const handleRepost = () => {
        if (e?._id) repost(e._id)
    }
    return (
        <div>
            <Stack flexDirection={'column'} justifyContent={'space-between'}>
                <Stack flexDirection={'column'} gap={1}>
                    <Stack flexDirection={'column'}></Stack>
                    {/* Real username from post admin */}
                <Typography variant='h6'
                        fontWeight={'bold'}
                        fontSize={_300 ? '1rem' : '0.8rem'}
                    >{e?.admin?.userName}</Typography>

                    {/* Clickable link to single post page */}
                    <Link to={`/post/${e?._id}`} className='link' >
                        <Typography variant='h5'
                            fontSize={_700 ? '1.4em' : _400 ? '1.2rem' : _300 ? '1rem' : '.8rem'} color={darkMode ? 'white' : 'black'}
                        >{e?.text}</Typography>
                    </Link>
                </Stack>

                {/* Show media only if post has an image */}
                {e?.media && (
                    <img src={e.media} alt="post media" loading='lazy'
                        width={'auto'} height={_700 ? '280px' : _500 ? '250px' : _400 ? '200px' : '150px'} />
                )}

                <Stack flexDirection={'column'} gap={1}>
                    <Stack flexDirection={'row'}
                        gap={2}
                        m={1}>
                        {/* Like button --- highlights if already liked */}
                        <AiOutlineLike
                            size={_700 ? 28 : _300 ? 25 : 22}
                            onClick={handleLike}
                            style={{ cursor:'pointer', color: isLiked ? 'crimson' : 'inherit' }}
                        />
                        <Link to={`/post/${e?._id}`}>
                            <FaRegCommentDots size={_700 ? 28 : _300 ? 25 : 22} style={{ cursor:'pointer' }} />
                        </Link>
                        {/* Repost button --- highlights if already reposted */}
                        <AiOutlineRetweet
                            size={_700 ? 28 : _300 ? 25 : 22}
                            onClick={handleRepost}
                            style={{ cursor:'pointer', color: isReposted ? 'green' : 'inherit' }}
                        />
                        <PiShareFat size={_700 ? 28 : _300 ? 25 : 22} />

                    </Stack>
                    {/* Real like/comment counts from DB */}
                    <Stack flexDirection={'row'}
                        gap={1}
                        position={'relative'}
                        top={-3}
                        left={4}>
                        <Typography variant='caption' fontSize={_700 ? '0.9rem' : '.7rem'} color={darkMode ? 'white' : 'gray'}>
                            {e?.likes?.length ?? 0} Likes .
                        </Typography>
                        <Typography variant='caption' fontSize={_700 ? '0.9rem' : '.7rem'} color={darkMode ? 'white' : 'gray'}>
                            {e?.comments?.length ?? 0} comment{e?.comments?.length !== 1 ? 's' : ''}
                        </Typography>
                    </Stack>
                </Stack>

            </Stack>
        </div>
    )
}

export default PostTwo
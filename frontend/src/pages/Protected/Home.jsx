import React, { useEffect, useState } from 'react'
import { Stack, Button, Typography, Box, Avatar } from '@mui/material'
import { FiArrowUpRight, FiPlus, FiStar } from 'react-icons/fi'
import Input from '../../components/home/Input'
import Post from '../../components/home/Post'
import { useAllPostsQuery, useSuggestedUsersQuery, useFollowUserMutation } from '../../redux/service'
import { useSelector } from 'react-redux'
import Loader from '../../components/common/Loader'
import { useLocation } from 'react-router-dom'
import { useGuestAccess } from '../../components/common/GuestAccess'

function Home() {
    const [page, setPage] = useState(1)
    const [showMore, setShowMore] = useState(true)
    const { data, isLoading, isError } = useAllPostsQuery(page)
    const { allPosts, myInfo } = useSelector((state) => state.service)
    const guest = useLocation().pathname.startsWith('/guest')
    const { requestAccount } = useGuestAccess()
    const { data: memberData } = useSuggestedUsersQuery()
    const [followUser] = useFollowUserMutation()
    const [followedIds, setFollowedIds] = useState([])
    const members = (memberData?.users || [])
        .filter((member) => member._id !== myInfo?._id && !followedIds.includes(member._id))
        .slice(0, 3)

    const handleFollow = async (id) => {
        if (guest || !myInfo) return requestAccount('follow people in the BlogPost community')
        try {
            await followUser(id).unwrap()
            setFollowedIds((ids) => [...ids, id])
        } catch (err) {
            console.error('Follow failed:', err)
        }
    }

    const handleClick = () => {
        setPage((prev) => prev + 1)
    }

    useEffect(() => {
        if (data?.post != null) {
            if (data.post.length < 3) setShowMore(false)
        }
    }, [data])

    if (isLoading && allPosts.length === 0) return <Loader />

    return (
        <Box className="home-layout">
          <Box className="feed-column">
            <Box className="feed-heading">
                <div className="feed-heading-copy">
                    <span className="eyebrow"><FiStar /> A PLACE OF YOUR OWN</span>
                    <Typography variant="h1">Your corner<span>.</span></Typography>
                    <Typography className="feed-subtitle">Your people, your ideas, your little corner of the internet.</Typography>
                </div>
                <div className="feed-count"><span className="live-dot" /> LIVE</div>
            </Box>
            <div className="feed-tabs"><button className="feed-tab active">For you</button><button className="feed-tab">Following</button><button className="feed-tab">Discover</button></div>
            <Input />

            <Stack className="feed-stream" flexDirection="column" sx={{ width: '100%' }}>
                {allPosts.length > 0 ? (
                    allPosts.map((e) => <Post key={e._id} e={e} />)
                ) : isError ? (
                    <Typography variant="body2" textAlign="center" color="error" py={6}>
                        Failed to load posts. Please refresh.
                    </Typography>
                ) : (
                    <Box textAlign="center" py={8}>
                        <Typography variant="h6" fontWeight={700} mb={1}>
                            Welcome to BlogPost
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Follow creators or share the first post!
                        </Typography>
                    </Box>
                )}
            </Stack>

            {showMore ? (
                <Stack alignItems='center' my={3}>
                    <Button
                        className="threads-outline-btn"
                        onClick={handleClick}
                        disabled={isLoading}
                        sx={{ px: 3, py: 1 }}
                    >
                        {isLoading ? 'Loading...' : 'Load more'}
                    </Button>
                </Stack>
            ) : allPosts?.length > 0 && (
                <Typography variant='caption' textAlign='center' display='block' my={4} color='text.secondary'>
                    You're all caught up!
                </Typography>
            )}
          </Box>
          <Box component="aside" className="feed-sidebar">
            <div className="sidebar-card people-card">
                <div className="sidebar-title"><div><span className="eyebrow">YOUR BLOGPOST COMMUNITY</span><h2>People you might like</h2></div><FiStar /></div>
                {members.length ? members.map((member) => <div className="person-row" key={member._id}><Avatar src={member.profilePic} alt={member.userName} sx={{ width: 42, height: 42 }} /><div className="person-copy"><strong>{member.userName}</strong><small>{member.bio || 'A member of BlogPost'}</small></div><button className="follow-chip" onClick={() => handleFollow(member._id)}><FiPlus /> Follow</button></div>) : <Typography variant="body2" color="text.secondary" sx={{ py: 2, lineHeight: 1.6 }}>{memberData?.users?.length ? 'You know everyone here for now.' : 'As more people join BlogPost, you’ll find them here.'}</Typography>}
                {members.length > 0 && <p className="community-note">Real people sharing their own little corners.</p>}
            </div>
            <p className="sidebar-footer">Made for your people and the things you want to share. <span>✳</span></p>
          </Box>
        </Box>
    )
}

export default Home


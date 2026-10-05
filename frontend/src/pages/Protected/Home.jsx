import React, { useEffect, useState } from 'react'
import { Stack, Button, Typography, Box, Avatar } from '@mui/material'
import { FiArrowUpRight, FiHash, FiPlus, FiStar } from 'react-icons/fi'
import Input from '../../components/home/Input'
import Post from '../../components/home/Post'
import { useAllPostsQuery } from '../../redux/service'
import { useSelector } from 'react-redux'
import Loader from '../../components/common/Loader'

function Home() {
    const [page, setPage] = useState(1)
    const [showMore, setShowMore] = useState(true)
    const { data, isLoading, isError } = useAllPostsQuery(page)
    const { allPosts } = useSelector((state) => state.service)

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
                    <span className="eyebrow"><FiStar /> YOUR DAILY DOSE</span>
                    <Typography variant="h1">The feed<span>.</span></Typography>
                    <Typography className="feed-subtitle">Little moments, big ideas, and everything in between.</Typography>
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
            <div className="sidebar-card trend-card">
                <div className="sidebar-title"><div><span className="eyebrow">WHAT'S HAPPENING</span><h2>Trending now</h2></div><FiArrowUpRight /></div>
                {[['01', 'slow mornings', '2.4k posts'], ['02', 'camera roll', '1.8k posts'], ['03', 'little wins', '946 posts']].map(([number, tag, count]) => <div className="trend-row" key={tag}><span className="trend-number">{number}</span><div><strong><FiHash />{tag}</strong><small>{count}</small></div><FiArrowUpRight className="trend-arrow" /></div>)}
                <button className="see-all">See what else is happening <FiArrowUpRight /></button>
            </div>
            <div className="sidebar-card people-card">
                <div className="sidebar-title"><div><span className="eyebrow">GOOD PEOPLE, GOOD POSTS</span><h2>People to know</h2></div><FiStar /></div>
                {[
                    ['Maya Chen', '@mayamakes', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces'],
                    ['Theo Rivera', '@theo.outside', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces'],
                    ['Nina Park', '@ninainbloom', 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&h=100&fit=crop&crop=faces'],
                ].map(([name, handle, photo]) => <div className="person-row" key={handle}><Avatar src={photo} alt={name} sx={{ width: 42, height: 42 }} /><div className="person-copy"><strong>{name}</strong><small>{handle}</small></div><button className="follow-chip"><FiPlus /> Follow</button></div>)}
                <button className="see-all">Meet more people <FiArrowUpRight /></button>
            </div>
            <p className="sidebar-footer">A little corner of the internet, made for you. <span>✳</span></p>
          </Box>
        </Box>
    )
}

export default Home


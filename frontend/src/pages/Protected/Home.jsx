import React, { useEffect, useState } from 'react'
import { Stack, Button, Typography, Box, Avatar } from '@mui/material'
import { FiArrowUpRight, FiPlus, FiStar } from 'react-icons/fi'
import Input from '../../components/home/Input'
import Post from '../../components/home/Post'
import { useAllPostsQuery, useFeedPostsQuery, useSuggestedUsersQuery, useFollowUserMutation } from '../../redux/service'
import { useSelector } from 'react-redux'
import Loader from '../../components/common/Loader'
import { useLocation } from 'react-router-dom'
import { useGuestAccess } from '../../components/common/GuestAccess'

function Home() {
    const guest = useLocation().pathname.startsWith('/guest')
    const [page, setPage] = useState(1)
    const [showMore, setShowMore] = useState(true)
    const [feed, setFeed] = useState('for-you')
    const [otherFeedPosts, setOtherFeedPosts] = useState([])
    const { currentData: forYouData, isLoading: forYouLoading, isFetching: forYouFetching, isError: forYouError } = useAllPostsQuery(page, { skip: feed !== 'for-you' })
    const { currentData: feedData, isLoading: feedLoading, isFetching: feedFetching, isError: feedError } = useFeedPostsQuery(
        { feed, page },
        { skip: feed === 'for-you' || (feed === 'following' && guest) },
    )
    const { allPosts, myInfo } = useSelector((state) => state.service)
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

    const handleClick = () => setPage((prev) => prev + 1)

    const handleFeedChange = (nextFeed) => {
        if (nextFeed === 'following' && (guest || !myInfo)) {
            requestAccount('see posts from people you follow')
            return
        }
        setFeed(nextFeed)
        setPage(1)
        setShowMore(true)
        setOtherFeedPosts([])
    }

    useEffect(() => {
        const result = feed === 'for-you' ? forYouData : feedData
        if (!result?.post) return
        setShowMore(result.post.length === 5)
        if (feed !== 'for-you') {
            setOtherFeedPosts((previous) => {
                const next = page === 1 ? [] : previous
                const postsById = new Map(next.map((post) => [post._id, post]))
                result.post.forEach((post) => postsById.set(post._id, post))
                return Array.from(postsById.values())
            })
        }
    }, [forYouData, feedData, feed, page])

    const visiblePosts = feed === 'for-you' ? allPosts : otherFeedPosts
    const isLoading = feed === 'for-you' ? forYouLoading : feedLoading
    const isFetching = feed === 'for-you' ? forYouFetching : feedFetching
    const isError = feed === 'for-you' ? forYouError : feedError

    if (isLoading && visiblePosts.length === 0) return <Loader />

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
            <div className="feed-tabs" role="tablist" aria-label="Post feeds">
                {[
                    ['for-you', 'For you'],
                    ['following', 'Following'],
                    ['discover', 'Discover'],
                ].map(([value, label]) => <button key={value} role="tab" aria-selected={feed === value} className={`feed-tab ${feed === value ? 'active' : ''}`} onClick={() => handleFeedChange(value)}>{label}</button>)}
            </div>
            <Input />

            <Stack className="feed-stream" flexDirection="column" sx={{ width: '100%' }}>
                {visiblePosts.length > 0 ? (
                    visiblePosts.map((e) => <Post key={e._id} e={e} />)
                ) : isError ? (
                    <Typography variant="body2" textAlign="center" color="error" py={6}>
                        Failed to load posts. Please refresh.
                    </Typography>
                ) : feed === 'following' ? (
                    <Box textAlign="center" py={8}>
                        <Typography variant="h6" fontWeight={700} mb={1}>Your feed starts with people</Typography>
                        <Typography variant="body2" color="text.secondary">Follow a few BlogPost members and their posts will appear here.</Typography>
                    </Box>
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
                        disabled={isFetching}
                        sx={{ px: 3, py: 1 }}
                    >
                        {isFetching ? 'Loading...' : 'Load more'}
                    </Button>
                </Stack>
            ) : visiblePosts.length > 0 && (
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


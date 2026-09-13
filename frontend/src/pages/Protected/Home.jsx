import React, { useEffect, useState } from 'react'
import { Stack, Button, Typography, Box } from '@mui/material'
import Input from '../../components/home/Input'
import Post from '../../components/home/Post'
import { useAllPostsQuery } from '../../redux/service'
import { useSelector } from 'react-redux'
import Loader from '../../components/common/Loader'

function Home() {
    const [page, setPage] = useState(1)
    const [showMore, setShowMore] = useState(true)
    const { data, isLoading, isError } = useAllPostsQuery(page)
    const { allPosts, darkMode } = useSelector((state) => state.service)

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
        <Box sx={{ width: '100%' }}>
            <Input />

            <Stack flexDirection="column" sx={{ width: '100%' }}>
                {allPosts.length > 0 ? (
                    allPosts.map((e) => <Post key={e._id} e={e} />)
                ) : isError ? (
                    <Typography variant="body2" textAlign="center" color="error" py={6}>
                        Failed to load threads. Please refresh.
                    </Typography>
                ) : (
                    <Box textAlign="center" py={8}>
                        <Typography variant="h6" fontWeight={700} mb={1}>
                            Welcome to BlogPost
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Follow accounts or start the very first thread!
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
    )
}

export default Home

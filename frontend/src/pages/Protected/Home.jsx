import React, { useEffect, useState } from 'react'
import { Stack, Button, Typography } from '@mui/material'
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
        // Guard: data?.post may be undefined on first render or error
        if (data?.post != null) {
            if (data.post.length < 3) setShowMore(false)
        }
    }, [data])

    if (isLoading && allPosts.length === 0) return <Loader />

    return (
        <div>
            <Input />
            <Stack flexDirection="column" gap={2} mb={10}>
                {allPosts.length > 0 ? (
                    allPosts.map((e) => <Post key={e._id} e={e} />)
                ) : isError ? (
                    <Typography variant="caption" textAlign="center" color="error">
                        Failed to load posts. Please refresh.
                    </Typography>
                ) : (
                    <Typography variant="caption" textAlign="center" color="text.secondary">
                        No posts yet!
                    </Typography>
                )}
            </Stack>

            {showMore ? (
                <Stack alignItems='center'>
                    <Button
                        size='large'
                        sx={{ my: 2, textDecoration: 'underline' }}
                        onClick={handleClick}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Loading...' : 'Load More'}
                    </Button>
                </Stack>
            ) : allPosts?.length > 0 && (
                <Typography variant='caption' textAlign='center' display='block' my={2} color='text.secondary'>
                    You've reached the end!
                </Typography>
            )}
        </div>
    )
}

export default Home

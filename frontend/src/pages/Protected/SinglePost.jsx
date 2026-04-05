import React from 'react'
import { Button, Stack, TextField, Typography, CircularProgress } from '@mui/material'
import Post from '../../components/home/Post'
import Comments from '../../components/home/post/Comments'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
// fetch this single post and add comments via API
import { useSinglePostQuery, useAddCommentMutation } from '../../redux/service'

function SinglePost() {
    const { id } = useParams()
    const [comment, setComment] = useState('')

    // Fetch the real post data from backend
    const { data, isLoading, isError } = useSinglePostQuery(id)
    const post = data?.post

    // Mutation to post a comment
    const [addComment, { isLoading: isCommenting }] = useAddCommentMutation()

    const handleComment = async () => {
        if (!comment.trim() || !id) return
        try {
            await addComment({ id, text: comment }).unwrap()
            setComment('') // clear input after success
        } catch (err) {
            console.error('Comment failed:', err)
        }
    }

    if (isLoading) return <CircularProgress sx={{ display: 'block', mx: 'auto', mt: 10 }} />
    if (isError || !post) return <Typography textAlign='center' mt={10}>Post not found!</Typography>

    return (
        <div>
            <Stack flexDirection={'column'} my={5} gap={2}>
                {/* Pass the real post data to Post component */}
                <Post e={post} />

                <Stack gap={2} width={'80%'} mx={'auto'} flexDirection={'column'}>
                    {/* Render all real comments from this post */}
                    {post.comments?.length > 0
                        ? post.comments.map((c) => (
                            <Comments key={c._id} comment={c} postId={post._id} />
                          ))
                        : <Typography variant='caption' textAlign='center' color='gray'>No comments yet. Be first!</Typography>
                    }
                </Stack>

                {/* Comment input wired to API */}
                <Stack flexDirection={'column'} alignItems={'center'} gap={1}>
                    <TextField
                        variant='outlined'
                        autoFocus
                        value={comment}
                        placeholder='Comment here...'
                        id='comment'
                        sx={{ width: { xs: '90%', sm: '70%', md: '50%' }, mx: 'auto', my: 1, p: 1 }}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button variant='contained' onClick={handleComment} disabled={isCommenting}>
                        {isCommenting ? 'Posting...' : 'Post'}
                    </Button>
                </Stack>
            </Stack>
        </div>
    )
}

export default SinglePost

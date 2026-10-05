import React from 'react'
import { Stack, Typography, Box } from '@mui/material'
import Post from '../../../components/home/Post'
import { useParams } from 'react-router-dom'
import { useUserDetailsQuery } from '../../../redux/service'

function Threads() {
  const { id } = useParams()
  const { data: userDetails, isLoading } = useUserDetailsQuery(id, { skip: !id })
  const threads = userDetails?.user?.threads || []

  if (isLoading) return null

  return (
    <Stack flexDirection={'column'} width="100%" pb={8}>
      {threads.length > 0 ? (
        threads.map((post) => <Post key={post._id} e={post} />)
      ) : (
        <Box textAlign="center" py={8}>
          <Typography variant="body2" color="text.secondary">
            No posts yet.
          </Typography>
        </Box>
      )}
    </Stack>
  )
}

export default Threads

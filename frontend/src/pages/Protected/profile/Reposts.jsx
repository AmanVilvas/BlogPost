import React from 'react'
import { Stack, Typography, Box } from '@mui/material'
import Post from '../../../components/home/Post'
import { useParams } from 'react-router-dom'
import { useUserDetailsQuery } from '../../../redux/service'

function Reposts() {
  const { id } = useParams()
  const { data: userDetails, isLoading } = useUserDetailsQuery(id, { skip: !id })
  const reposts = userDetails?.user?.reposts || []

  if (isLoading) return null

  return (
    <Stack flexDirection={'column'} width="100%" pb={8}>
      {reposts.length > 0 ? (
        reposts.map((post) => <Post key={post._id} e={post} />)
      ) : (
        <Box textAlign="center" py={8}>
          <Typography variant="body2" color="text.secondary">
            No reposts yet.
          </Typography>
        </Box>
      )}
    </Stack>
  )
}

export default Reposts

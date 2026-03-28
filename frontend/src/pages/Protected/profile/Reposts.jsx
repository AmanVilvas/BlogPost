import React from 'react'
import { Stack, Typography, useMediaQuery } from '@mui/material'
import Post from '../../../components/home/Post'
import { useParams } from 'react-router-dom'
import { useUserDetailsQuery } from '../../../redux/service'

function Reposts() {
  const _700 = useMediaQuery('(min-width:700px)')
  const { id } = useParams()
  const { data: userDetails, isLoading } = useUserDetailsQuery(id, { skip: !id })
  const reposts = userDetails?.user?.reposts || []

  if (isLoading) return null

  return (
    <Stack flexDirection={'column'} gap={2} mb={10} width={_700 ? '800px' : '90%'} mx={'auto'}>
      {reposts.length > 0
        ? reposts.map((post) => <Post key={post._id} e={post} />)
        : <Typography variant='caption' textAlign='center' color='gray'>No reposts yet.</Typography>
      }
    </Stack>
  )
}

export default Reposts

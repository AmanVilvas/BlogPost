import React from 'react'
import { Stack } from '@mui/material'
import Posts from '../../../components/home/Post'


function Reposts() {
  return (
    <Stack flexDirection={'column'} gap={2}
      mb={10} width={'800px'} mx={'auto'} >
      <Posts />
      <Posts />
      <Posts />
    </Stack>
  )
}

export default Reposts

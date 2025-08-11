import React from 'react'
import { Stack, useMediaQuery } from '@mui/material'
import Posts from '../../../components/home/Post'

function Threads() {
  const _700 = useMediaQuery('(min-width:700px)')

  return (
    <Stack flexDirection={'column'} gap={2} mb={10} width={_700 ? '800px' : '90%'} mx={'auto'}>
      <Posts fullWidth />
      <Posts fullWidth />
      <Posts fullWidth />
    </Stack>
  )
}

export default Threads
// 3:32:20
import React from 'react'
import { Stack } from '@mui/material'
import Comments from '../../../components/home/post/Comments'


function Replies() {
  return (
    <div>
      <Stack flexDirection={'column'} gap={2}
        width={'800px'} mx={'auto'}>
        
      <Comments />

      </Stack>
    </div>
  )
}

export default Replies

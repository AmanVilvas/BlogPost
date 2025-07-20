import React from 'react'
import { Avatar, Button, Stack, Typography } from '@mui/material'
function ProfileBar() {
  return (
    <div>
      <Stack flexDirection={'row'}
      justifyContent={'space-between'}
      px={1} py={2} mx={'auto'}
      boxShadow={'5px 5px 5px gray'}
      borderRadius= {'10px'}
      >
        <Stack flexDirection={'row'} gap={2}>
          <Avatar src='' alt='' />
          <Stack flexDirection={'column'}>
            <Typography variant='h6' fontWeight={'bold'} fontSize={'1rem'}>
              Aman Sharma
            </Typography>
            <Typography variant='caption' fontSize={'.8rem'} color='grey'>User info</Typography>
            <Typography variant='caption' fontSize={'.9rem'} >3 followers</Typography>
          </Stack>
        </Stack>

        <Button size='medium'
        sx={{
          border: '1px solid grey',
          color: 'white',
          borderRadius: '10px',
          p:2,
          height:40,
          backgroundColor: 'blue'
        }}
        >
          Follow
        </Button>

      </Stack>
    </div>
  )
}

export default ProfileBar

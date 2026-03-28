import React from 'react'
import { Stack, Typography, useMediaQuery, Avatar } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useUserDetailsQuery } from '../../../redux/service'
import { Link } from 'react-router-dom'

function Replies() {
  const _700 = useMediaQuery('(min-width:700px)')
  const { id } = useParams()
  const { data: userDetails, isLoading } = useUserDetailsQuery(id, { skip: !id })
  const replies = userDetails?.user?.replies || []

  if (isLoading) return null

  return (
    <Stack flexDirection={'column'} gap={2} width={_700 ? '800px' : '90%'} mx={'auto'} mb={10}>
      {replies.length > 0
        ? replies.map((reply) => (
          <Stack
            key={reply._id}
            flexDirection={'row'}
            gap={2}
            p={2}
            borderBottom={'1px solid gray'}
            alignItems={'flex-start'}
          >
            <Avatar
              src={reply?.admin?.profilePic}
              alt={reply?.admin?.userName}
              sx={{ width: 36, height: 36 }}
            />
            <Stack flexDirection={'column'} gap={0.5}>
              <Typography variant='subtitle2' fontWeight='bold'>
                {reply?.admin?.userName}
              </Typography>
              <Typography variant='body2'>{reply?.text}</Typography>
              <Link
                to={`/post/${reply?.post}`}
                style={{ fontSize: '0.75rem', color: 'gray', textDecoration: 'none' }}
              >
                View post →
              </Link>
            </Stack>
          </Stack>
        ))
        : <Typography variant='caption' textAlign='center' color='gray'>No replies yet.</Typography>
      }
    </Stack>
  )
}

export default Replies

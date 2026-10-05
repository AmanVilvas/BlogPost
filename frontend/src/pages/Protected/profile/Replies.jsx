import React from 'react'
import { Stack, Typography, Avatar, Box, useMediaQuery } from '@mui/material'
import { useParams, Link } from 'react-router-dom'
import { useUserDetailsQuery } from '../../../redux/service'
import { useSelector } from 'react-redux'

function Replies() {
  const { id } = useParams()
  const { data: userDetails, isLoading } = useUserDetailsQuery(id, { skip: !id })
  const replies = userDetails?.user?.replies || []
  const { darkMode } = useSelector(state => state.service)
  const _700 = useMediaQuery('(min-width:700px)')

  if (isLoading) return null

  return (
    <Stack flexDirection={'column'} width="100%" pb={8}>
      {replies.length > 0 ? (
        replies.map((reply) => (
          <Box
            key={reply._id}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
              px: _700 ? 3 : 2,
              py: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
              transition: 'background-color 0.15s ease',
              '&:hover': {
                bgcolor: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)',
              },
            }}
          >
            <Avatar
              src={reply?.admin?.profilePic || ''}
              alt={reply?.admin?.userName}
              sx={{ width: 38, height: 38, border: '1px solid', borderColor: 'divider' }}
            />
            <Stack flexDirection={'column'} gap={0.4} flex={1} minWidth={0}>
              <Typography variant="body2" fontWeight={700}>
                {reply?.admin?.userName}
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.45, color: 'text.primary' }}>
                {reply?.text}
              </Typography>
              <Link
                to={`/post/${reply?.post}`}
                style={{
                  display: 'inline-block',
                  fontSize: '0.82rem',
                  color: '#0095f6',
                  textDecoration: 'none',
                  marginTop: '4px',
                  fontWeight: 500,
                }}
              >
                View post →
              </Link>
            </Stack>
          </Box>
        ))
      ) : (
        <Box textAlign="center" py={8}>
          <Typography variant="body2" color="text.secondary">
            No replies yet.
          </Typography>
        </Box>
      )}
    </Stack>
  )
}

export default Replies

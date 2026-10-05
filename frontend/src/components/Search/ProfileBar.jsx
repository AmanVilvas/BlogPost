import React from 'react'
import { useMediaQuery, Avatar, Button, Stack, Typography, Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { useFollowUserMutation } from '../../redux/service'
import { Link, useLocation } from 'react-router-dom'
import { useGuestAccess } from '../common/GuestAccess'

function ProfileBar({ user }) {
  const _700 = useMediaQuery("(min-width:700px)")
  const { darkMode, myInfo } = useSelector(state => state.service)
  const [followUser] = useFollowUserMutation()
  const guest = useLocation().pathname.startsWith('/guest')
  const { requestAccount } = useGuestAccess()

  const isFollowing = user?.followers?.some(f => String(f._id || f) === String(myInfo?._id))
  const isMe = String(user?._id) === String(myInfo?._id)

  const handleFollow = async () => {
    if (guest || !myInfo) return requestAccount('follow people')
    if (!user?._id) return
    try {
      await followUser(user._id).unwrap()
    } catch (err) {
      console.error('Follow failed:', err)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 2,
        px: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        transition: 'background-color 0.15s ease',
        '&:hover': {
          bgcolor: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.015)',
        },
      }}
    >
      {/* Left: Avatar & Info */}
      <Stack flexDirection={'row'} gap={2} alignItems={'center'} flex={1} minWidth={0} mr={2}>
        <Link to={`${guest ? '/guest' : ''}/profile/threads/${user?._id}`} style={{ textDecoration: 'none' }}>
          <Avatar
            src={user?.profilePic || ''}
            alt={user?.userName}
            sx={{
              width: 48,
              height: 48,
              border: '1px solid',
              borderColor: 'divider',
              transition: 'opacity 0.15s ease',
              '&:hover': { opacity: 0.85 },
            }}
          />
        </Link>
        <Stack flexDirection={'column'} flex={1} minWidth={0}>
          <Link to={`${guest ? '/guest' : ''}/profile/threads/${user?._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Typography
              fontWeight={700}
              fontSize={'0.95rem'}
              letterSpacing={'-0.015em'}
              noWrap
              sx={{ '&:hover': { textDecoration: 'underline' } }}
            >
              {user?.userName}
            </Typography>
          </Link>
          <Typography variant="body2" color="text.secondary" fontSize={'0.85rem'} noWrap>
            {user?.bio || `@${user?.userName?.toLowerCase().replace(/\s+/g, '')}`}
          </Typography>
          <Typography variant="caption" color="text.secondary" fontSize={'0.78rem'} sx={{ mt: 0.2 }}>
            {user?.followers?.length ?? 0} follower{user?.followers?.length !== 1 ? 's' : ''}
          </Typography>
        </Stack>
      </Stack>

      {/* Follow action */}
      {!isMe && (
        <Button
          className={isFollowing ? "threads-outline-btn" : "threads-pill-btn"}
          onClick={handleFollow}
          sx={{
            minWidth: '94px',
            fontSize: '0.85rem !important',
            py: '5px !important',
          }}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </Button>
      )}
    </Box>
  )
}

export default ProfileBar

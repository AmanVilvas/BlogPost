import React from 'react'
import { Stack, Typography, Chip, Avatar, Button, useMediaQuery, Box } from '@mui/material'
import { FaInstagram } from "react-icons/fa6"
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { EditProfileModel } from '../../../redux/slice'
import { useUserDetailsQuery, useFollowUserMutation } from '../../../redux/service'

function ProfileLayout() {
  const { id } = useParams()
  const _700 = useMediaQuery('(min-width:700px)')
  const dispatch = useDispatch()
  const { darkMode, myInfo } = useSelector((state) => state.service)
  const { data: userDetails, isLoading } = useUserDetailsQuery(id, { skip: !id })
  const user = userDetails?.user

  const [followUser] = useFollowUserMutation()

  const isMyProfile = myInfo?._id === id
  const isFollowing = user?.followers?.some(f => (f._id || f) === myInfo?._id)

  const handleOpenEditProfile = () => {
    dispatch(EditProfileModel(true))
  }

  const handleFollow = async () => {
    if (!id) return
    try {
      await followUser(id).unwrap()
    } catch (err) {
      console.error('Follow failed:', err)
    }
  }

  if (isLoading) return null

  const getTabStyle = (isActive) => ({
    flex: 1,
    textAlign: 'center',
    paddingBottom: '12px',
    paddingTop: '8px',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '0.95rem',
    color: isActive ? (darkMode ? '#ffffff' : '#000000') : (darkMode ? '#777777' : '#999999'),
    borderBottom: isActive
      ? `2px solid ${darkMode ? '#ffffff' : '#000000'}`
      : '2px solid transparent',
    transition: 'all 0.18s ease',
    letterSpacing: '-0.01em',
  })

  return (
    <Box sx={{ width: '100%', pt: 2 }}>
      {/* Profile Header Information */}
      <Box sx={{ px: _700 ? 3 : 2, pb: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Stack direction="column" gap={0.6}>
            <Typography variant="h4" fontWeight={800} letterSpacing="-0.03em" sx={{ fontSize: _700 ? '1.75rem' : '1.4rem' }}>
              {user?.userName || 'User'}
            </Typography>
            <Stack direction="row" alignItems="center" gap={1}>
              <Typography variant="body2" color="text.secondary" fontSize="0.9rem">
                @{user?.userName?.toLowerCase().replace(/\s+/g, '') || 'user'}
              </Typography>
              <Chip
                label="blogpost.net"
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.72rem',
                  fontWeight: 500,
                  bgcolor: darkMode ? '#1e1e1e' : '#f0f0f0',
                  color: 'text.secondary',
                  borderRadius: '6px',
                }}
              />
            </Stack>
          </Stack>

          <Avatar
            src={user?.profilePic || ''}
            alt={user?.userName}
            sx={{
              width: _700 ? 84 : 70,
              height: _700 ? 84 : 70,
              border: '1px solid',
              borderColor: 'divider',
            }}
          />
        </Stack>

        {/* Bio */}
        {user?.bio && (
          <Typography variant="body1" sx={{ color: 'text.primary', mb: 2, fontSize: '0.95rem', lineHeight: 1.5 }}>
            {user.bio}
          </Typography>
        )}

        {/* Follower Stats & Instagram Icon */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2.5}>
          <Typography variant="body2" color="text.secondary" fontSize="0.88rem">
            {user?.followers?.length ?? 0} follower{user?.followers?.length !== 1 ? 's' : ''}
          </Typography>
          <Box
            sx={{
              cursor: 'pointer',
              color: 'text.secondary',
              transition: 'color 0.15s ease',
              '&:hover': { color: darkMode ? '#fff' : '#000' },
            }}
          >
            <FaInstagram size={22} />
          </Box>
        </Stack>

        {/* Action Button: Edit Profile or Follow */}
        {isMyProfile ? (
          <Button
            className="threads-outline-btn"
            fullWidth
            onClick={handleOpenEditProfile}
            sx={{ py: 1, borderRadius: '12px !important' }}
          >
            Edit profile
          </Button>
        ) : (
          <Button
            className={isFollowing ? "threads-outline-btn" : "threads-pill-btn"}
            fullWidth
            onClick={handleFollow}
            sx={{ py: 1, borderRadius: '12px !important' }}
          >
            {isFollowing ? 'Following' : 'Follow'}
          </Button>
        )}
      </Box>

      {/* Tabs Row: Threads, Replies, Reposts */}
      <Stack
        direction="row"
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          mt: 2,
        }}
      >
        <NavLink to={`/profile/threads/${id}`} style={({ isActive }) => getTabStyle(isActive)}>
          Threads
        </NavLink>
        <NavLink to={`/profile/replies/${id}`} style={({ isActive }) => getTabStyle(isActive)}>
          Replies
        </NavLink>
        <NavLink to={`/profile/reposts/${id}`} style={({ isActive }) => getTabStyle(isActive)}>
          Reposts
        </NavLink>
      </Stack>

      {/* Tab Content */}
      <Box sx={{ mt: 1 }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default ProfileLayout
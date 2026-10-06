import React from 'react'
import { Stack, Typography, Chip, Avatar, Button, useMediaQuery, Box } from '@mui/material'
import { FaInstagram } from "react-icons/fa6"
import { NavLink, Outlet, useParams, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { EditProfileModel } from '../../../redux/slice'
import { useUserDetailsQuery, useFollowUserMutation } from '../../../redux/service'
import { useGuestAccess } from '../../../components/common/GuestAccess'
import Loader from '../../../components/common/Loader'

function ProfileLayout() {
  const { id } = useParams()
  const _700 = useMediaQuery('(min-width:700px)')
  const dispatch = useDispatch()
  const { darkMode, myInfo } = useSelector((state) => state.service)
  const guest = useLocation().pathname.startsWith('/guest')
  const { requestAccount } = useGuestAccess()
  const { data: userDetails, isLoading, isError } = useUserDetailsQuery(id, { skip: !id })
  const user = userDetails?.user

  const [followUser, { isLoading: isFollowingRequest }] = useFollowUserMutation()

  const isMyProfile = String(myInfo?._id) === String(id)
  const isFollowing = user?.followers?.some(f => String(f._id || f) === String(myInfo?._id))

  const handleOpenEditProfile = () => {
    dispatch(EditProfileModel(true))
  }

  const handleFollow = async () => {
    if (guest || !myInfo) return requestAccount('follow people')
    if (!id) return
    try {
      await followUser(id).unwrap()
    } catch (err) {
      console.error('Follow failed:', err)
    }
  }

  if (isLoading) return <Loader />
  if (isError || !user) return <Box textAlign="center" py={8}><Typography variant="h6" fontWeight={700} mb={1}>Profile unavailable</Typography><Typography color="text.secondary">This profile could not be loaded. Please try again.</Typography></Box>

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
          <Stack direction="column" gap={0.8} alignItems="flex-start" minWidth={0}>
            <Stack direction="row" alignItems="center" gap={1.5} flexWrap="wrap">
              <Typography variant="h4" fontWeight={800} letterSpacing="-0.03em" sx={{ fontSize: _700 ? '1.75rem' : '1.4rem' }}>
                {user?.userName || 'User'}
              </Typography>
              {isMyProfile && !guest ? <Button
                className="threads-outline-btn"
                onClick={handleOpenEditProfile}
                sx={{ minWidth: 112, py: 0.7, px: 2 }}
              >Edit profile</Button> : <Button
                className={isFollowing ? 'threads-outline-btn profile-follow-btn is-following' : 'profile-follow-btn'}
                onClick={handleFollow}
                disabled={isFollowingRequest}
                aria-label={`${isFollowing ? 'Unfollow' : 'Follow'} ${user?.userName}`}
                sx={{ minWidth: 104, minHeight: 38, py: 0.7, px: 2, flexShrink: 0 }}
              >
                {isFollowingRequest ? 'Updating…' : isFollowing ? 'Following' : 'Follow'}
              </Button>}
            </Stack>
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

      </Box>

      {/* Profile content tabs */}
      <Stack
        direction="row"
        sx={{
          borderBottom: '1px solid',
          borderColor: 'divider',
          mt: 2,
        }}
      >
        <NavLink to={`${guest ? '/guest' : ''}/profile/threads/${id}`} style={({ isActive }) => getTabStyle(isActive)}>
          Posts
        </NavLink>
        <NavLink to={`${guest ? '/guest' : ''}/profile/replies/${id}`} style={({ isActive }) => getTabStyle(isActive)}>
          Replies
        </NavLink>
        <NavLink to={`${guest ? '/guest' : ''}/profile/reposts/${id}`} style={({ isActive }) => getTabStyle(isActive)}>
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

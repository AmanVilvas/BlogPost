import { useMediaQuery, Avatar, Button, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import { useFollowUserMutation } from '../../redux/service'
import { Link } from 'react-router-dom'

function ProfileBar({ user }) {
  const _700 = useMediaQuery("(min-width:700px)")
  const { darkMode, myInfo } = useSelector(state => state.service)
  const [followUser] = useFollowUserMutation()

  const isFollowing = user?.followers?.some(f => (f._id || f) === myInfo?._id)
  const isMe = user?._id === myInfo?._id

  const handleFollow = async () => {
    if (!user?._id) return
    try {
      await followUser(user._id).unwrap()
    } catch (err) {
      console.error('Follow failed:', err)
    }
  }

  return (
    <div>
      <Stack
        flexDirection={'row'}
        justifyContent={'space-between'}
        px={1} py={2} mx={'auto'}
        boxShadow={'5px 5px 5px gray'}
        borderRadius={'10px'}
        width={_700 ? '80%' : '90%'}
      >
        <Stack flexDirection={'row'} gap={2}>
          <Link to={`/profile/threads/${user?._id}`}>
            <Avatar src={user?.profilePic || ''} alt={user?.userName} />
          </Link>
          <Stack flexDirection={'column'}>
            <Typography variant='h6' fontWeight={'bold'} fontSize={_700 ? '1rem' : '.8rem'}>
              {user?.userName}
            </Typography>
            <Typography variant='caption' fontSize={_700 ? '1rem' : '.8rem'} color={darkMode ? 'white' : 'grey'}>
              {user?.bio || 'No bio'}
            </Typography>
            <Typography variant='caption' fontSize={_700 ? '1rem' : '.8rem'}>
              {user?.followers?.length ?? 0} follower{user?.followers?.length !== 1 ? 's' : ''}
            </Typography>
          </Stack>
        </Stack>

        {!isMe && (
          <Button
            size='medium'
            onClick={handleFollow}
            sx={{
              border: darkMode ? '1px solid white' : '1px solid grey',
              color: darkMode ? (isFollowing ? 'black' : 'white') : (isFollowing ? 'white' : 'white'),
              borderRadius: '10px',
              p: 2,
              height: 40,
              backgroundColor: isFollowing
                ? (darkMode ? 'gray' : 'gray')
                : (darkMode ? 'white' : 'grey'),
              marginRight: '15px',
              "&:hover": {
                backgroundColor: darkMode ? 'blue' : 'white',
                color: darkMode ? 'white' : 'black'
              }
            }}
          >
            {isFollowing ? 'Unfollow' : 'Follow'}
          </Button>
        )}
      </Stack>
    </div>
  )
}

export default ProfileBar

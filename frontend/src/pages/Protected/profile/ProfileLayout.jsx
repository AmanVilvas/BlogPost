import React from 'react'
import { Stack, Typography, Chip, Avatar, Button, useMediaQuery } from '@mui/material'
import { FaInstagram } from "react-icons/fa6";
import { Link, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { EditProfileModel } from '../../../redux/slice';
import { useUserDetailsQuery } from '../../../redux/service';
function ProfileLayout() {

  const {id} = useParams()
  const _300 = useMediaQuery('(min-width:300px)')
  const _660 = useMediaQuery('(min-width:660px)')
  const _700 = useMediaQuery('(min-width:700px)')
      const dispatch = useDispatch()
      const {darkMode} = useSelector((state) => state.service)
  const containerWidth = _700 ? '800px' : _660 ? '600px' : '90%'
  const {data: userDetails} = useUserDetailsQuery(id)
  const dispatcher = useDispatch()

  const handleOpenEditProfile = ()=>{
    dispatcher(EditProfileModel(true))
  }
  
// console.log(EditProfileModel);


  return (
    <Stack flexDirection={'column'} alignItems={'center'}>
      <Stack
        flexDirection={'column'}
        width={containerWidth}
        mx={'auto'}
        p={2}
        m={2}
        gap={2}
      >
        <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Stack flexDirection={'column'} gap={1}>
            <Typography variant='h2' fontWeight={'bold'} fontSize={_660 ? '2rem' : '1.4rem'}>
              Aman Sharma
            </Typography>
            <Stack flexDirection={'row'} alignItems={'center'} gap={1}>
              <Typography variant='body2' color={'text.secondary'} fontSize={_300 ? '.95rem' : '.85rem'}>
                @aman
              </Typography>
              <Chip
                label='Followed by you'
                size="small"
                sx={{ fontSize: _300 ? '.75rem' : '.65rem', height: 22 }}
              />
            </Stack>
          </Stack>

          <Avatar
            src=""
            alt="Aman Sharma"
            sx={{ width: _700 ? 80 : 64, height: _700 ? 80 : 64 }}
          />
        </Stack>

        <Typography variant='body1' color={'text.primary'}>
          This is a bio
        </Typography>

        <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography variant='subtitle2' color='text.secondary'>19,000 followers</Typography>
          <FaInstagram size={_300 ? 28 : 22} style={{ cursor: 'pointer' }} />
        </Stack>

        <Button
          size='medium'
          sx={{
            color: darkMode ? 'white' : black ,
            width: '100%',
            textAlign: 'center',
            border: '1px solid #d0d0d0',
            borderRadius: '12px',
            mt: 1
          }}
        onClick={handleOpenEditProfile}
        >
          Edit profile
        </Button>
      </Stack>

      <Stack
        flexDirection={'row'}
        justifyContent={'space-evenly'}
        my={3}
        pb={2}
        borderBottom={'2px solid #e0e0e0'}
        fontSize={_660 ? '1.1rem' : _300 ? '1rem' : '0.95rem'}
        width={containerWidth}
        mx={'auto'}
        color={'grey'}
      >
        <Link to={'/profile/threads/1'} style={{ textDecoration: 'none', color: 'inherit' }}>Threads</Link>
        <Link to={'/profile/replies/1'} style={{ textDecoration: 'none', color: 'inherit' }}>Replies</Link>
        <Link to={'/profile/reposts/1'} style={{ textDecoration: 'none', color: 'inherit' }}>Reposts</Link>
      </Stack>

      <Outlet />
    </Stack>
  )
}

export default ProfileLayout
  
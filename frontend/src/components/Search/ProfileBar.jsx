import { useMediaQuery, Avatar, Button, Stack, Typography } from '@mui/material'
import { useSelector } from 'react-redux'



function ProfileBar() {
      
  const _700 = useMediaQuery("(min-width:700px)")
const {darkMode} = useSelector(state=>state.service)
  return (
    <div>
      <Stack flexDirection={'row'}
      justifyContent={'space-between'}
      px={1} py={2} mx={'auto'}
      boxShadow={'5px 5px 5px gray'}
      borderRadius= {'10px'} width={_700 ? '80%' : '90%'}
      >
        <Stack flexDirection={'row'} gap={2}>
          <Avatar src='' alt='' />
          <Stack flexDirection={'column'}>
            <Typography variant='h6' fontWeight={'bold'} fontSize={_700 ? '1rem' : '.8rem'}>
              Aman Sharma
            </Typography>
            <Typography variant='caption' fontSize={_700 ? '1rem' : '.8rem'} color={darkMode ? 'white' : 'grey'}>User info</Typography>
            <Typography variant='caption' fontSize={_700 ? '1rem' : '.8rem'} >3 followers</Typography>
          </Stack>
        </Stack>

        <Button size='medium'
        sx={{
          border: darkMode ? '1px solid white' : '1px solid grey',
          color: darkMode ? 'black' : 'white',
          borderRadius: '10px',
          p:2,
          height:40,
          backgroundColor: darkMode ? 'white' : 'grey',
          marginRight: '15px',

          "&:hover": {
            backgroundColor: darkMode ? 'blue' : 'white',
            color: darkMode ? 'white' : 'black'
          }
        }}
        >
          Follow
        </Button>

      </Stack>
    </div>
  )
}

export default ProfileBar

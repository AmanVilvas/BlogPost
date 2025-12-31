import SearchInput from '../../components/Search/SearchInput'
import ProfileBar from '../../components/Search/ProfileBar'
import React from 'react'
import { Stack } from '@mui/material'


function Search() {
  return (
    <div>
      <SearchInput />
      <Stack flexDirection={'coulmn'} gap={1} mb={5}
      width={'90%'} mx={'auto'}
      >

      <ProfileBar />
      <ProfileBar />
      <ProfileBar />
      </Stack>
    </div>

  )
}

export default Search

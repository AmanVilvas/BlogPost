import React, { useState } from 'react'
import { InputAdornment, Stack, TextField, useMediaQuery } from '@mui/material'
import { CiSearch } from "react-icons/ci";
import { useSearchUsersQuery } from '../../redux/service'
import ProfileBar from './ProfileBar'

function SearchInput() {
  const _700 = useMediaQuery("(min-width:700px)")
  const [query, setQuery] = useState('')

  // Only search when query length >= 2
  const { data, isFetching } = useSearchUsersQuery(query, {
    skip: query.length < 2,
  })

  const users = data?.users || []

  return (
    <Stack>
      <TextField
        sx={{
          width: "90%",
          maxWidth: '750px',
          boxShadow: '5px 5px 5px gray',
          borderRadius: '15px',
          px: 2, py: 1, my: 5, mx: 'auto',
          "& .MuiOutlinedInput-root": {
            color: 'inherit',
            "& fieldset": {
              border: 'none',
            },
          },
        }}
        placeholder='Search profile...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start' sx={{ color: 'inherit' }}>
              <CiSearch />
            </InputAdornment>
          ),
        }}
      />

      <Stack flexDirection={'column'} gap={1} mb={5} width={'90%'} mx={'auto'}>
        {isFetching ? null : users.map((user) => (
          <ProfileBar key={user._id} user={user} />
        ))}
      </Stack>
    </Stack>
  )
}

export default SearchInput

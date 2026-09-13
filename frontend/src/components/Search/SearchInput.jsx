import React, { useState } from 'react'
import { Box, InputAdornment, Stack, TextField, useMediaQuery, Typography } from '@mui/material'
import { IoSearch, IoCloseCircle } from "react-icons/io5"
import { useSearchUsersQuery } from '../../redux/service'
import ProfileBar from './ProfileBar'
import { useSelector } from 'react-redux'

function SearchInput() {
  const _700 = useMediaQuery("(min-width:700px)")
  const [query, setQuery] = useState('')
  const { darkMode } = useSelector(state => state.service)

  // Only search when query length >= 2
  const { data, isFetching } = useSearchUsersQuery(query, {
    skip: query.length < 2,
  })

  const users = data?.users || []

  return (
    <Box sx={{ width: '100%', px: _700 ? 3 : 2, pt: 2, pb: 8 }}>
      {/* Search Title */}
      <Typography variant="h5" fontWeight={800} letterSpacing="-0.03em" mb={2.5}>
        Search
      </Typography>

      {/* Threads Search Pill Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: darkMode ? '#181818' : '#f0f0f0',
          borderRadius: '16px',
          px: 2,
          py: 1,
          border: '1px solid',
          borderColor: 'divider',
          transition: 'all 0.2s ease',
          '&:focus-within': {
            borderColor: darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.25)',
            bgcolor: darkMode ? '#1c1c1c' : '#ffffff',
            boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.06)',
          },
        }}
      >
        <IoSearch size={20} color={darkMode ? '#777' : '#999'} style={{ marginRight: 10, flexShrink: 0 }} />
        <Box
          component="input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search profiles..."
          sx={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            color: 'inherit',
            fontSize: '0.95rem',
            fontFamily: 'inherit',
            letterSpacing: '-0.01em',
            '&::placeholder': {
              color: 'text.secondary',
            },
          }}
        />
        {query && (
          <Box
            onClick={() => setQuery('')}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'text.secondary' }}
          >
            <IoCloseCircle size={18} />
          </Box>
        )}
      </Box>

      {/* Search Results */}
      <Stack flexDirection={'column'} mt={3} width={'100%'}>
        {query.length >= 2 && users.length === 0 && !isFetching ? (
          <Typography variant="body2" textAlign="center" color="text.secondary" py={6}>
            No profiles found for "{query}"
          </Typography>
        ) : (
          users.map((user) => (
            <ProfileBar key={user._id} user={user} />
          ))
        )}
      </Stack>
    </Box>
  )
}

export default SearchInput

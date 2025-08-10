import React, { useState } from 'react'
import { useMediaQuery, Avatar, Stack, Typography } from '@mui/material'
import { IoIosMore } from 'react-icons/io'
import { Menu, MenuItem } from '@mui/material'
import { MdDeleteOutline } from 'react-icons/md'

function Comments() {
    const _700 = useMediaQuery('(min-width:700px)')
    const [menuAnchorEl, setMenuAnchorEl] = useState(null)

    const handleOpenMenu = (event) => {
        setMenuAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setMenuAnchorEl(null)
    }

    const handleDeleteComment = () => {
        // TODO: implement delete
        handleClose()
    }

    return (
        <div>
        <Stack flexDirection={'row'}
        justifyContent={'space-between'}
        px={2} pb={4}
        borderBottom={'1px solid gray'} 
        mx={'auto'} width={'90%'}
        >
            <Stack flexDirection={'row'} gap={_700 ? 2 : 1}>
            <Avatar src='' alt='' />
            <Stack flexDirection={'column'}>
                <Typography variant='h5'fontWeight={'bold'} fontSize={'.9rem'} >Aman Sharma</Typography>
                <Typography variant='subtitle2'>This is my comment.</Typography>
            </Stack>
            </Stack>
            <Stack flexDirection={'row'} gap={1} alignItems={'center'} color={'grey'}>
                <p>24d</p>
                <IoIosMore
                  size={_700 ? 28 : 20}
                  onClick={handleOpenMenu}
                  style={{ cursor: 'pointer' }}
                />
            </Stack>
        </Stack>
        <Menu
          anchorEl={menuAnchorEl}
          open={Boolean(menuAnchorEl)}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={handleDeleteComment} sx={{ color: 'error.main' }}>
            <MdDeleteOutline size={18} style={{ marginRight: 8 }} />
            Delete
          </MenuItem>
        </Menu>
        </div>
    )
}

export default Comments

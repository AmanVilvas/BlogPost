import React from 'react'
import { Menu, MenuItem } from '@mui/material'



function MyMenu() {
  const handleClose = ()=>{}
  const handleDeletePost = ()=>{}


    return (
        <div>
        <Menu anchorEl={""} open={true}
        onClose={handleClose} 
        anchorOrigin={{vertical:'bottom', horizontal:'right'}}
          transformOrigin={{vertical: 'top',horizontal: 'right' }}  ></Menu>
          <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
        </div>
    )
}

export default MyMenu

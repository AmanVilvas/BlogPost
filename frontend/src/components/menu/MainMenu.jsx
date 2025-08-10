import { Menu,MenuItem } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
//4:34:23git status

function MainMenu({ anchorEl, open, onClose }) {
  const handleToggleTheme = () => {
    // TODO: implement theme toggle
    onClose();
  };

  const handleLogout = () => {
    // TODO: implement logout
    onClose();
  };

  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleToggleTheme}>Toggle Theme</MenuItem>
        <Link to={'/profile/threads/2'}>
          <MenuItem onClick={onClose}>My Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default MainMenu

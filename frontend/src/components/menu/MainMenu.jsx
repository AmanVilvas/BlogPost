import { Menu, MenuItem } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { addMyInfo, toggleColorMode, toggleMainMenu } from '../../redux/slice';
import { useLogoutMeMutation } from '../../redux/service';

function MainMenu({ anchorEl, open, onClose }) {

  const [logoutMe] = useLogoutMeMutation()
  const { darkMode, myInfo } = useSelector((state) => state.service)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(toggleMainMenu(null))
  }

  const handleToggleTheme = () => {
    handleClose()
    dispatch(toggleColorMode())
  }

  const handleLogout = async () => {
    handleClose()
    try {
      await logoutMe().unwrap()
    } catch (err) {
      // even if the server call fails, force clear client-side state
    }
    dispatch(addMyInfo(null))
    window.location.href = '/'
  }

  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          style: {
            marginTop: '8px',
            minWidth: '200px',
          },
        }}
      >
        <MenuItem onClick={handleToggleTheme}>
          {darkMode ? 'Light mode' : 'Dark mode'}
        </MenuItem>
        <Link to={`/profile/threads/${myInfo?._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={onClose}>My Profile</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default MainMenu

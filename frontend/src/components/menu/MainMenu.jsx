import { Menu, MenuItem } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { addMyInfo, toggleColorMode, toggleMainMenu } from '../../redux/slice';
import { useLogoutMeMutation } from '../../redux/service';

function MainMenu({ anchorEl, open, onClose }) {

  const [logoutMe, logoutMeData] = useLogoutMeMutation()
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
    await logoutMe()
  }

  useEffect(() => {
    if (logoutMeData.isSuccess) {
      // Clear local user state — payload is null so reducer must safely handle it
      dispatch(addMyInfo(null))
      window.location.reload()
    }
  }, [logoutMeData.isSuccess])

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

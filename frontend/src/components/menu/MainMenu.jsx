import { Menu, MenuItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addMyInfo, toggleColorMode, toggleMainMenu } from '../../redux/slice'
import { useLogoutMeMutation } from '../../redux/service'
import { IoSunnyOutline, IoMoonOutline, IoPersonOutline, IoLogOutOutline } from 'react-icons/io5'

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
      // ignore
    }
    dispatch(addMyInfo(null))
    window.location.href = '/'
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 200,
          borderRadius: '16px',
          bgcolor: darkMode ? '#1c1c1c' : '#ffffff',
          backgroundImage: 'none',
          color: 'text.primary',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: darkMode ? '0 16px 40px rgba(0,0,0,0.7)' : '0 12px 32px rgba(0,0,0,0.12)',
          p: 0.5,
          '& .MuiMenuItem-root': {
            borderRadius: '10px',
            py: 1.2,
            px: 1.8,
            fontSize: '0.92rem',
            fontWeight: 500,
            '&:hover': {
              bgcolor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            },
          },
        },
      }}
    >
      <MenuItem onClick={handleToggleTheme}>
        <ListItemIcon sx={{ color: 'inherit', minWidth: 32 }}>
          {darkMode ? <IoSunnyOutline size={18} /> : <IoMoonOutline size={18} />}
        </ListItemIcon>
        <ListItemText primary={darkMode ? 'Appearance: Dark' : 'Appearance: Light'} />
      </MenuItem>

      {myInfo && (
        <Link to={`/profile/threads/${myInfo._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <MenuItem onClick={onClose}>
            <ListItemIcon sx={{ color: 'inherit', minWidth: 32 }}>
              <IoPersonOutline size={18} />
            </ListItemIcon>
            <ListItemText primary="Your profile" />
          </MenuItem>
        </Link>
      )}

      <Divider sx={{ my: 0.5, borderColor: 'divider' }} />

      <MenuItem onClick={handleLogout} sx={{ color: '#ff3040 !important' }}>
        <ListItemIcon sx={{ color: '#ff3040', minWidth: 32 }}>
          <IoLogOutOutline size={18} />
        </ListItemIcon>
        <ListItemText primary="Log out" />
      </MenuItem>
    </Menu>
  )
}

export default MainMenu

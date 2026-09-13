import React from 'react'
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { toggleMyMenu, addPostID } from '../../redux/slice'
import { useDeletePostMutation } from '../../redux/service'
import { MdDeleteOutline } from 'react-icons/md'

function MyMenu() {
  const { anchorE2, postID, darkMode } = useSelector(state => state.service)
  const dispatch = useDispatch()
  const [deletePost] = useDeletePostMutation()

  const handleClose = () => {
    dispatch(toggleMyMenu(null))
    dispatch(addPostID(null))
  }

  const handleDeletePost = async () => {
    if (!postID) return
    try {
      await deletePost(postID).unwrap()
    } catch (err) {
      console.error('Delete post failed:', err)
    } finally {
      handleClose()
    }
  }

  return (
    <Menu
      anchorEl={anchorE2}
      open={Boolean(anchorE2)}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          mt: 0.5,
          minWidth: 160,
          borderRadius: '14px',
          bgcolor: darkMode ? '#1c1c1c' : '#ffffff',
          backgroundImage: 'none',
          color: 'text.primary',
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: darkMode ? '0 12px 32px rgba(0,0,0,0.7)' : '0 10px 24px rgba(0,0,0,0.12)',
          p: 0.5,
          '& .MuiMenuItem-root': {
            borderRadius: '10px',
            py: 1,
            px: 1.5,
            fontSize: '0.9rem',
            fontWeight: 600,
          },
        },
      }}
    >
      <MenuItem onClick={handleDeletePost} sx={{ color: '#ff3040 !important' }}>
        <ListItemIcon sx={{ color: '#ff3040', minWidth: 30 }}>
          <MdDeleteOutline size={18} />
        </ListItemIcon>
        <ListItemText primary="Delete thread" />
      </MenuItem>
    </Menu>
  )
}

export default MyMenu

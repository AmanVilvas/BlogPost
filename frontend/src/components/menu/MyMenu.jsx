import React from 'react'
import { Menu, MenuItem } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { toggleMyMenu, addPostID } from '../../redux/slice'
import { useDeletePostMutation } from '../../redux/service'

function MyMenu() {
  const { anchorE2, postID } = useSelector(state => state.service)
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
    <div>
      <Menu
        anchorEl={anchorE2}
        open={anchorE2 ? true : false}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleDeletePost} sx={{ color: 'error.main' }}>
          Delete
        </MenuItem>
      </Menu>
    </div>
  )
}

export default MyMenu

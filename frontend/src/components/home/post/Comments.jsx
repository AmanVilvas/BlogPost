import React, { useState } from 'react'
import { useMediaQuery, Avatar, Stack, Typography } from '@mui/material'
import { IoIosMore } from 'react-icons/io'
import { Menu, MenuItem } from '@mui/material'
import { MdDeleteOutline } from 'react-icons/md'
import { useSelector } from 'react-redux'
// deleteComment wired up below
import { useDeleteCommentMutation } from '../../../redux/service'

// comment -- the actual comment object from the backend (with .admin, .text, .createdAt)
// postId -- needed to tell the server which post this comment belongs to
function Comments({ comment, postId }) {
    const _700 = useMediaQuery('(min-width:700px)')
    const [menuAnchorEl, setMenuAnchorEl] = useState(null)
    const { darkMode, myInfo } = useSelector(state => state.service)

    const [deleteComment] = useDeleteCommentMutation()

    const handleOpenMenu = (event) => {
        setMenuAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setMenuAnchorEl(null)
    }

    const handleDeleteComment = async () => {
        handleClose()
        try {
            await deleteComment({ postId, id: comment._id }).unwrap()
        } catch (err) {
            console.error('Delete comment failed:', err)
        }
    }

    // Only show delete option if this comment belongs to the logged-in user
    const isMyComment = myInfo?._id === comment?.admin?._id

    // Format timestamp
    const timeAgo = comment?.createdAt
        ? new Date(comment.createdAt).toLocaleDateString()
        : ''

    return (
        <div>
        <Stack flexDirection={'row'}
        justifyContent={'space-between'}
        px={2} pb={4}
        borderBottom={darkMode ? '1px solid white' : '1px solid gray'} 
        mx={'auto'} width={'90%'}
        >
            <Stack flexDirection={'row'} gap={_700 ? 2 : 1}>
            {/* Real commenter avatar */}
            <Avatar src={comment?.admin?.profilePic} alt={comment?.admin?.userName} />
            <Stack flexDirection={'column'}>
                {/* Real commenter username */}
                <Typography variant='h5'fontWeight={'bold'} fontSize={'.9rem'} >{comment?.admin?.userName}</Typography>
                {/* Real comment text */}
                <Typography variant='subtitle2'>{comment?.text}</Typography>
            </Stack>
            </Stack>
            <Stack flexDirection={'row'} gap={1} alignItems={'center'} color={darkMode ? 'white' : 'grey'}>
                <p>{timeAgo}</p>
                {/* Only show the 3-dots menu if it's the user's own comment */}
                {isMyComment && (
                    <IoIosMore
                      size={_700 ? 28 : 20}
                      onClick={handleOpenMenu}
                      style={{ cursor: 'pointer' }}
                    />
                )}
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

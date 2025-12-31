import React from 'react'
import { Menu, MenuItem } from '@mui/material'
import {useSelector, useDispatch} from 'react-redux'
import { toggleMyMenu } from '../../redux/slice'


function MyMenu() {

  const {anchorE2} = useSelector(state=>state.service)
  const dispatch = useDispatch()
  const handleClose = ()=>{
    dispatch(toggleMyMenu(null))
  }
  const handleDeletePost = ()=>{}


    return (
        <div>
        <Menu anchorEl={anchorE2} open={anchorE2 ? true : false}
        onClose={handleClose} 
        anchorOrigin={{vertical:'bottom', horizontal:'right'}}
          transformOrigin={{vertical: 'top',horizontal: 'right' }}>
          <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
        </Menu>
        </div>
    )
}

export default MyMenu

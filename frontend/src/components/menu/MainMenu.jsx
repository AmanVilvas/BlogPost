import { Menu,MenuItem } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

//4:34:23git status

function MainMenu() {

    const handleClose = ()=>{}

    // const handleToggleTheme = ()=> {}
    const handleLogout = ()=> {}
    const handleToggleTheme = ()=> {}

    return (
        <div>
            <Menu
            anchorEl={''} open={true}
            onClose={handleClose}
            anchorOrigin={{vertical: 'bottom', horizontal:'right'}}
            transformOrigin={{vertical: 'top', horizontal:'right'}}
            
            >
                <MenuItem onclick={handleToggleTheme}>Toggle Theme</MenuItem>
                <Link to={'/profile/threads/2'}>
                <MenuItem>My Profile</MenuItem>
                </Link>
                <MenuItem onclick={handleLogout}>Logout</MenuItem>


            </Menu>
        </div>
    )
}

export default MainMenu

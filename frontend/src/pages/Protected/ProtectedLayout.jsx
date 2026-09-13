import React from 'react'
import { Outlet } from 'react-router-dom'
import { Stack, useMediaQuery, Box } from '@mui/material'
import Header from '../../components/common/Header'
import AddPost from '../../components/modals/AddPost'
import EditProfile from '../../components/modals/EditProfile'
import MyMenu from '../../components/menu/MyMenu'

function ProtectedLayout() {
    const _700 = useMediaQuery("(min-width:700px)")

    return (
        <Box
            sx={{
                bgcolor: 'background.default',
                color: 'text.primary',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Header />
            <AddPost />
            <EditProfile />
            <MyMenu />

            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    width: '100%',
                    maxWidth: _700 ? '640px' : '100%',
                    mx: 'auto',
                    flex: 1,
                    pb: !_700 ? '70px' : '40px',
                    pt: _700 ? 2 : 1,
                }}
            >
                <Outlet />
            </Box>
        </Box>
    )
}

export default ProtectedLayout

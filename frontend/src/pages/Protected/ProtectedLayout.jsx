import React from 'react'
import { Outlet } from 'react-router-dom'
import { Stack, useMediaQuery, Box } from '@mui/material'
import Header from '../../components/common/Header'
import AddPost from '../../components/modals/AddPost'
import EditProfile from '../../components/modals/EditProfile'
import MyMenu from '../../components/menu/MyMenu'
import { GuestWelcome } from '../../components/common/GuestAccess'

function ProtectedLayout({ guest = false }) {
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
            <Header guest={guest} />
            <AddPost />
            <EditProfile />
            <MyMenu />

            {/* Main Content Area */}
            <Box
                component="main"
                sx={{
                    width: '100%',
                    maxWidth: _700 ? '1180px' : '100%',
                    mx: 'auto',
                    flex: 1,
                    pb: !_700 ? '70px' : '40px',
                    pt: _700 ? 3 : 1,
                }}
            >
                {guest && <GuestWelcome />}
                <Outlet />
            </Box>
        </Box>
    )
}

export default ProtectedLayout

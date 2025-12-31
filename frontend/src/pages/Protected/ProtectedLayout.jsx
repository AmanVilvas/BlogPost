import React from 'react'
import { Outlet } from 'react-router-dom'
import { Stack, useMediaQuery } from '@mui/material'
import Header from '../../components/common/Header'
import AddPost from '../../components/modals/AddPost'
import EditProfile from '../../components/modals/EditProfile'
import MainMenu from '../../components/menu/MainMenu'
import MyMenu from '../../components/menu/MyMenu'
import { useSelector } from 'react-redux'

function ProtectedLayout() {
    const _700 = useMediaQuery("(min-width:700px)")
    const {darkMode} = useSelector(state=>state.service)
    
    return (
        <Stack 
        flexDirection={'column'}
        maxWidth={_700 ?'800px' : '90%'}
        minWidth={'100%'}
        mx={'auto'}
        overflow={'hidden'}
        sx={{
            bgcolor: 'background.default',
            color: 'text.primary',
            minHeight: '100vh'
        }}
        >
        <Header />
        <AddPost />
        <EditProfile />
        <MainMenu />
        <MyMenu />
        <Outlet />
        </Stack>
    )
}

export default ProtectedLayout

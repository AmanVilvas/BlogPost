import React from 'react'
import { Avatar, Stack, Typography } from '@mui/material'
import {IoIosMore} from 'react-icons/io'

function Comments() {
    return (
        <div>
        <Stack flexDirection={'row'}
        justifyContent={'space-between'}
        px={2} pb={4}
        borderBottom={'1px solid gray'} 
        mx={'auto'} width={'90%'}
        >
            <Stack flexDirection={'row'} gap={2}>
            <Avatar src='' alt='' />
            <Stack flexDirection={'column'}>
                <Typography variant='h5'fontWeight={'bold'} fontSize={'.9rem'} >Aman Sharma</Typography>
                <Typography variant='subtitle2'>This is my comment.</Typography>
            </Stack>
            </Stack>
            <Stack flexDirection={'row'} gap={1} alignItems={'center'} color={'grey'}>
                <p>24d</p>
                <IoIosMore size={28} />
            </Stack>
        </Stack>
        </div>
    )
}

export default Comments

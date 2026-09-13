import React from 'react'
import { CircularProgress, Stack, Box } from "@mui/material"
import { useSelector } from 'react-redux'

function Loader() {
    const { darkMode } = useSelector(state => state.service || {})

    return (
        <Stack
            minHeight={"50vh"}
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
            my={4}
        >
            <CircularProgress
                size={32}
                thickness={4}
                sx={{
                    color: darkMode ? '#ffffff' : '#000000',
                }}
            />
        </Stack>
    )
}

export default Loader

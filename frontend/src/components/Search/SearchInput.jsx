import React from 'react'
import { InputAdornment, Stack, TextField } from '@mui/material'
import { CiSearch } from "react-icons/ci";



function SearchInput() {
    return (
        <Stack>
            <TextField
            
            sx={{
                width:"90%",
                maxWidth: '750px',
                boxShadow:'5px 5px 5px gray',
                borderRadius:'15px',
                px:2, py:1, my:5, mx:'auto',
                "& .MuiOutlinedInput-root": {
                    color: 'black',
                    "& fieldset" :
                {
                    border: 'none',
                        } ,  
            },


            }}

            placeholder='Search profile...'
        InputProps={{
            startAdornment:(
                <InputAdornment position='start' 
                sx={{
                    color:'black'
                }}>
                <CiSearch />
            </InputAdornment>
            ),
        }}
            />
                
        </Stack>
    )
}

export default SearchInput

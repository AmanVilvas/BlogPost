import { Dialog, Box, DialogTitle, DialogContent, Stack, Avatar, Button, Input, Typography, useMediaQuery } from '@mui/material'
import React, { useState, useRef } from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { EditProfileModel } from '../../redux/slice'
// updateProfile mutation wired up below
import { useUpdateProfileMutation } from '../../redux/service'

// 4:24:26

function EditProfile() {

    const { openEditProfileModel, myInfo } = useSelector(state => state.service)
    const dispatch = useDispatch()

    

    const _700 = useMediaQuery("(min-width:700px)")
    const [pic, setPic] = useState()
    const [bio, setBio] = useState('')

    const imgRef = useRef()

    // API mutation for updating profile
    const [updateProfile, { isLoading }] = useUpdateProfileMutation()

    const handlePhoto = () => {
        imgRef.current.click()
    }

    const handleClose = () => {
        dispatch(EditProfileModel(false))

    }

    const handleUpdate = async () => {
        // FormData is required because server uses formidable to parse the file
        const formData = new FormData()
        if (bio) formData.append('text', bio)
        if (pic) formData.append('media', pic)

        try {
            await updateProfile(formData).unwrap()
            // Close modal on success
            dispatch(EditProfileModel(false))
        } catch (err) {
            console.error('Profile update failed:', err)
        }
    }

    return (
        <div>
        <Dialog open={ openEditProfileModel } onClose={handleClose}
            fullWidth fullScreen={_700 ? false : true}
        >
            <Box position={'absolute'} 
                top={20} right={20} onClick={handleClose}
            >
                <RxCross2 size={28}  className='image-icon' />
            </Box>
            <DialogTitle textAlign={'center'} mb={5}>
                Edit Profile
            </DialogTitle>
            <DialogContent>
                <Stack flexDirection={'column'} gap={1}>
                <Avatar src={ pic ? URL.createObjectURL(pic) : null} alt="" 
                sx={{
                width: 96, height: 96, alignSelf:'center'
                }}
                />
                <Button size='large' sx={{
                    border:'2px solid gray',
                    borderRadius: '10px',
                    width: 96, height: 40, alignSelf: 'center', my:2
                }}
                onClick={handlePhoto}
                >Change</Button>
            <Input type='file' className='file-input' accept='image/*' ref={imgRef} 
            onChange={(e)=> setPic(e.target.files[0 ])}
            />
            <Typography variant='subtitle1' 
            fontWeight={'bold'} fontSize={'1.2rem'}
            my={2}>Username</Typography>

            {/* Show real user's username (read-only) */}
            <Input type="text" value={myInfo?.userName || ''} readOnly className='text1' placeholder='' onChange={(e)=>{setBio(e.target.value)}} />

                </Stack>
            <Stack flexDirection={'column'} gap={1}>
                <Typography variant='subtitle1' 
            fontWeight={'bold'} fontSize={'1.2rem'}
            my={2}>Email</Typography>

            {/* Show real user's email (read-only) */}
            <Input type="text" value={myInfo?.email || ''} readOnly className='text1'  />
            </Stack>
                <Stack flexDirection={'column'} gap={1}>
                <Typography variant='subtitle1' 
            fontWeight={'bold'} fontSize={'1.2rem'}
            my={2}>Bio</Typography>

            {/* Bio is editable */}
            <Input placeholder='write your bio here' type="text" defaultValue={myInfo?.bio || ''} className='text1' onChange={(e) => setBio(e.target.value)} />
            </Stack>

            <Button size='large'
            sx={{
                border: '2px solid grey',
                borderRadius:'10px', bgcolor: 'GrayText', color:'white', width:'100%', my:2, fontSize: '1.2rem',
                ":hover": { cursor:'pointer', bgcolor:'gray'}
            }}
            onClick={handleUpdate}
            disabled={isLoading}
            >{isLoading ? 'Updating...' : ' Update '}</Button>


            </DialogContent>
        </Dialog>
        </div>
    )
}

export default EditProfile
import {
    Dialog,
    Box,
    DialogContent,
    Stack,
    Avatar,
    Button,
    Typography,
    useMediaQuery
} from '@mui/material'
import React, { useState, useRef } from 'react'
import { IoClose, IoCameraOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { EditProfileModel } from '../../redux/slice'
import { useUpdateProfileMutation } from '../../redux/service'

function EditProfile() {
    const { openEditProfileModel, myInfo, darkMode } = useSelector(state => state.service)
    const dispatch = useDispatch()
    const _700 = useMediaQuery("(min-width:700px)")

    const [pic, setPic] = useState(null)
    const [bio, setBio] = useState('')
    const imgRef = useRef()

    const [updateProfile, { isLoading }] = useUpdateProfileMutation()

    const handlePhoto = () => {
        imgRef.current.click()
    }

    const handleClose = () => {
        setPic(null)
        dispatch(EditProfileModel(false))
    }

    const handleUpdate = async () => {
        const formData = new FormData()
        if (bio) formData.append('text', bio)
        if (pic) formData.append('media', pic)

        try {
            await updateProfile(formData).unwrap()
            handleClose()
        } catch (err) {
            console.error('Profile update failed:', err)
        }
    }

    return (
        <Dialog
            open={openEditProfileModel}
            onClose={handleClose}
            fullWidth
            maxWidth="xs"
            fullScreen={!_700}
            PaperProps={{
                sx: {
                    bgcolor: darkMode ? '#181818' : '#ffffff',
                    backgroundImage: 'none',
                    color: 'text.primary',
                    borderRadius: _700 ? '20px' : 0,
                    border: _700 ? '1px solid' : 'none',
                    borderColor: 'divider',
                    boxShadow: '0 20px 48px rgba(0,0,0,0.6)',
                },
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 3,
                    py: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Typography
                    onClick={handleClose}
                    sx={{
                        fontSize: '0.95rem',
                        color: 'text.secondary',
                        cursor: 'pointer',
                        fontWeight: 500,
                        '&:hover': { color: 'text.primary' },
                    }}
                >
                    Cancel
                </Typography>

                <Typography fontWeight={700} fontSize="1rem" letterSpacing="-0.02em">
                    Edit profile
                </Typography>

                <Typography
                    onClick={handleUpdate}
                    sx={{
                        fontSize: '0.95rem',
                        color: isLoading ? 'text.secondary' : (darkMode ? '#fff' : '#000'),
                        cursor: isLoading ? 'not-allowed' : 'pointer',
                        fontWeight: 700,
                        '&:hover': { opacity: 0.8 },
                    }}
                >
                    {isLoading ? 'Saving...' : 'Done'}
                </Typography>
            </Box>

            <DialogContent sx={{ p: 3 }}>
                {/* Avatar with Camera Overlay */}
                <Stack alignItems="center" my={2}>
                    <Box sx={{ position: 'relative', cursor: 'pointer' }} onClick={handlePhoto}>
                        <Avatar
                            src={pic ? URL.createObjectURL(pic) : (myInfo?.profilePic || '')}
                            alt={myInfo?.userName}
                            sx={{
                                width: 84,
                                height: 84,
                                border: '2px solid',
                                borderColor: 'divider',
                            }}
                        />
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                bgcolor: darkMode ? '#2e2e2e' : '#e0e0e0',
                                color: 'text.primary',
                                borderRadius: '50%',
                                width: 28,
                                height: 28,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid',
                                borderColor: 'background.default',
                            }}
                        >
                            <IoCameraOutline size={16} />
                        </Box>
                    </Box>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 1, cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                        onClick={handlePhoto}
                    >
                        Change photo
                    </Typography>
                    <input
                        type="file"
                        className="file-input"
                        accept="image/*"
                        ref={imgRef}
                        onChange={(e) => setPic(e.target.files[0])}
                    />
                </Stack>

                {/* Form Fields: Threads Style Grouped Cards */}
                <Stack
                    spacing={0}
                    sx={{
                        borderRadius: '16px',
                        border: '1px solid',
                        borderColor: 'divider',
                        overflow: 'hidden',
                        bgcolor: darkMode ? '#141414' : '#fafafa',
                        mt: 2,
                    }}
                >
                    {/* Name */}
                    <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={0.5}>
                            Username
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            {myInfo?.userName}
                        </Typography>
                    </Box>

                    {/* Email */}
                    <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={0.5}>
                            Email
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {myInfo?.email}
                        </Typography>
                    </Box>

                    {/* Bio */}
                    <Box sx={{ p: 2 }}>
                        <Typography variant="caption" color="text.secondary" fontWeight={600} display="block" mb={0.5}>
                            Bio
                        </Typography>
                        <Box
                            component="textarea"
                            rows={3}
                            defaultValue={myInfo?.bio || ''}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="+ Write bio"
                            sx={{
                                width: '100%',
                                border: 'none',
                                outline: 'none',
                                bgcolor: 'transparent',
                                color: 'text.primary',
                                fontFamily: 'inherit',
                                fontSize: '0.9rem',
                                resize: 'none',
                                '&::placeholder': {
                                    color: 'text.secondary',
                                },
                            }}
                        />
                    </Box>
                </Stack>

                <Button
                    className="threads-pill-btn"
                    fullWidth
                    onClick={handleUpdate}
                    disabled={isLoading}
                    sx={{ mt: 3, py: 1 }}
                >
                    {isLoading ? 'Updating...' : 'Save Profile'}
                </Button>
            </DialogContent>
        </Dialog>
    )
}

export default EditProfile
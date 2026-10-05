import React, { useState, useRef } from 'react'
import {
    Dialog,
    DialogContent,
    useMediaQuery,
    Stack,
    Button,
    Box,
    Avatar,
    Typography,
    IconButton
} from '@mui/material'
import { IoClose, IoImagesOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { addPostModel } from '../../redux/slice'
import { useAddPostMutation } from '../../redux/service'

function AddPost() {
    const { openAddPostModel, myInfo, darkMode } = useSelector((state) => state.service)
    const _700 = useMediaQuery('(min-width:700px)')

    const [text, setText] = useState('')
    const [media, setMedia] = useState(null)
    const mediaRef = useRef()

    const [addPost, { isLoading }] = useAddPostMutation()
    const dispatch = useDispatch()

    const handleClose = () => {
        setText('')
        setMedia(null)
        dispatch(addPostModel(false))
    }

    const handlePost = async () => {
        if (!text.trim() && !media) return

        const formData = new FormData()
        if (text) formData.append('text', text)
        if (media) formData.append('media', media)

        try {
            await addPost(formData).unwrap()
            handleClose()
        } catch (err) {
            console.error('Post failed:', err)
        }
    }

    const handleRemoveMedia = () => {
        setMedia(null)
        if (mediaRef.current) mediaRef.current.value = ''
    }

    return (
        <Dialog
            open={openAddPostModel}
            onClose={handleClose}
            fullScreen={!_700}
            fullWidth
            maxWidth="sm"
            PaperProps={{
                sx: {
                    bgcolor: darkMode ? '#181818' : '#ffffff',
                    backgroundImage: 'none',
                    color: 'text.primary',
                    borderRadius: _700 ? '20px' : 0,
                    border: _700 ? '1px solid' : 'none',
                    borderColor: 'divider',
                    boxShadow: '0 20px 48px rgba(0,0,0,0.6)',
                    overflow: 'hidden',
                },
            }}
        >
            {/* Modal Header */}
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
                    New post
                </Typography>

                <Box sx={{ width: 48 }} />
            </Box>

            {/* Modal Content */}
            <DialogContent sx={{ p: 3 }}>
                <Stack direction="row" gap={2} alignItems="stretch">
                    {/* Left: Avatar + Connector Line */}
                    <Stack alignItems="center" sx={{ minWidth: 40, pt: 0.5 }}>
                        <Avatar
                            src={myInfo?.profilePic || ''}
                            alt={myInfo?.userName}
                            sx={{ width: 40, height: 40, border: '1px solid', borderColor: 'divider' }}
                        />
                        <Box
                            sx={{
                                width: '2px',
                                flex: 1,
                                minHeight: 40,
                                my: 1,
                                bgcolor: darkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)',
                                borderRadius: 1,
                            }}
                        />
                    </Stack>

                    {/* Right: Username + Textarea + Media Attachment */}
                    <Stack flex={1} minWidth={0} gap={1}>
                        <Typography fontWeight={700} fontSize="0.95rem">
                            {myInfo?.userName}
                        </Typography>

                        <Box
                            component="textarea"
                            rows={3}
                            autoFocus
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="What would you like to share?"
                            sx={{
                                width: '100%',
                                border: 'none',
                                outline: 'none',
                                bgcolor: 'transparent',
                                color: 'text.primary',
                                fontFamily: 'inherit',
                                fontSize: '0.96rem',
                                resize: 'none',
                                lineHeight: 1.5,
                                '&::placeholder': {
                                    color: 'text.secondary',
                                },
                            }}
                        />

                        {/* Media Preview if Selected */}
                        {media && (
                            <Box
                                sx={{
                                    position: 'relative',
                                    mt: 1,
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    maxHeight: 280,
                                }}
                            >
                                <img
                                    src={URL.createObjectURL(media)}
                                    alt="Upload preview"
                                    style={{ width: '100%', maxHeight: 280, objectFit: 'cover', display: 'block' }}
                                />
                                <Box
                                    onClick={handleRemoveMedia}
                                    sx={{
                                        position: 'absolute',
                                        top: 10,
                                        right: 10,
                                        width: 28,
                                        height: 28,
                                        borderRadius: '50%',
                                        bgcolor: 'rgba(0, 0, 0, 0.65)',
                                        color: '#ffffff',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.15s ease',
                                        '&:hover': {
                                            bgcolor: 'rgba(0, 0, 0, 0.85)',
                                            transform: 'scale(1.08)',
                                        },
                                    }}
                                >
                                    <IoClose size={18} />
                                </Box>
                            </Box>
                        )}

                        {/* Attachment Buttons */}
                        <Stack direction="row" alignItems="center" gap={2} mt={1}>
                            <Box
                                onClick={() => mediaRef.current?.click()}
                                sx={{
                                    cursor: 'pointer',
                                    color: 'text.secondary',
                                    display: 'flex',
                                    alignItems: 'center',
                                    transition: 'color 0.15s ease',
                                    '&:hover': { color: 'text.primary' },
                                }}
                                title="Attach photo"
                            >
                                <IoImagesOutline size={22} />
                            </Box>
                            <input
                                type="file"
                                accept="image/*"
                                className="file-input"
                                ref={mediaRef}
                                onChange={(e) => setMedia(e.target.files[0])}
                            />
                        </Stack>
                    </Stack>
                </Stack>

                {/* Bottom Bar: Reply permission & Post Pill Button */}
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mt={4}
                    pt={2}
                    borderTop="1px solid"
                    borderColor="divider"
                >
                    <Typography variant="caption" color="text.secondary" fontSize="0.85rem">
                        Anyone can reply & quote
                    </Typography>

                    <Button
                        className="threads-pill-btn"
                        onClick={handlePost}
                        disabled={isLoading || (!text.trim() && !media)}
                        sx={{ px: 3, py: 0.8 }}
                    >
                        {isLoading ? 'Posting...' : 'Post'}
                    </Button>
                </Stack>
            </DialogContent>
        </Dialog>
    )
}

export default AddPost

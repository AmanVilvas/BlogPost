import React from 'react'
import { Dialog, DialogContent, DialogTitle, useMediaQuery, Stack, Button, Box, Avatar, Typography } from '@mui/material'
import { RxCross2 } from 'react-icons/rx'
import { FaImages } from 'react-icons/fa'
import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addPostModel } from '../../redux/slice'



function AddPost() {

    const { openAddPostModel } = useSelector((state) => state.service)


    const _700 = useMediaQuery('(min-width:700px)')
    const _500 = useMediaQuery('(min-width:500px)')
    const _300 = useMediaQuery('(min-width:300px)')

    const [text, setText] = useState()
    const [media, setMedia] = useState()
    const mediaRef = useRef()


    const dispatch = useDispatch()
    const handlePost = () =>{}
    const handleClose = ()=>{
        dispatch(addPostModel(false))
    }
    const handleMediaRef = ()=>{
    mediaRef.current.click()
    }



    return (
        <div>
            <Dialog open={openAddPostModel} onClose={handleClose} 
            fullScreen={_700 ? false : true} fullWidth
            >
                <Box position={'absolute'} top={20} right={20}  >
                    <RxCross2  size={28} className='image-icon'
                    onClick={handleClose} />
                </Box>
                <DialogTitle textAlign={'center'} mb={5} >
                    New thread... 
                </DialogTitle>
                <DialogContent>
                    <Stack flexDirection={'row'} gap={2} mb={5} >
                    <Avatar src="" alt="" />
                    <Stack>
                        <Typography variant='h6' fontWeight={'bold'} fontSize={'1rem'} >Aman Sharma
                        </Typography>
                    <textarea cols={_500 ? 45 : 5} 
                    rows={2} className='text1' 
                    placeholder='Start a thread...'
                        autoFocus
                        onChange={(e)=>{
                            setText(e.target.value)
                        }}
                    />
                    {/* <img src="" alt="" id='url-img'
                    width={_500 ? 300 : _300 ? 200 : 100}
                    height={_500 ? 300 : _300 ? 200 : 100}
                    /> */}

                    {
                        media ? 
                        <img src={URL.createObjectURL(media)} alt="" />
                        : null
                    }

                    <FaImages size={28} className='image-icon' onClick={handleMediaRef}/>
                    <input type='file' accept='image/*' className='file-input' 
                    ref={mediaRef}
                    onChange={(e)=>{
                        setMedia(e.target.files[0])
                    }}
                    />
                    </Stack  >
                    
                    </Stack>
 
                    <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'} >

                <Typography variant='h6' fontSize={'1rem'} color={'grey'} >
                    Anyone can reply
                </Typography>
                <Button size={'large'} sx={{
                    bgcolor: 'greytext', color:'black', borderRadius: '12px',
                ":hover" :{
                    bgcolor:'blue', color:'white'
                    }
                }} 
                
                >Post</Button>
                    </Stack>

                </DialogContent>

            </Dialog>
        </div>
    )
}

export default AddPost

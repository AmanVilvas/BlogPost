import { Stack, useMediaQuery } from '@mui/material'
import { IoMdHome } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart, FaEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useState } from 'react';
import AddPost from '../../components/modals/AddPost'

function Navbar() {
    const _300 = useMediaQuery('(min-width:300px)')
    const [isAddOpen, setIsAddOpen] = useState(false)

    const handleOpenAdd = () => setIsAddOpen(true)
    const handleCloseAdd = () => setIsAddOpen(false)

    return (
        <Stack
            flexDirection={'row'}
            maxWidth={'100%'}
            alignItems={'center'}
            justifyContent={'space-around'}
        >
            <FiArrowLeft size={_300 ? 32 : 24 } 
            color='black'
            />
            <Link to={'/'} className='link'>
                <IoMdHome size={_300 ? 32 : 24} color='black' />
            </Link>

            <Link to={'/Search'}>
                <IoSearch size={_300 ? 32 : 24} color='black' />
            </Link>

                <FaRegHeart size={_300 ? 32 : 24} color='black' />

                <FaEdit size={_300 ? 32 : 24} color='black' className='image-icon' onClick={handleOpenAdd} style={{ cursor: 'pointer' }} />

            <Link to={'/profile/threads/1'}>
                <CgProfile size={_300 ? 32 : 24} color='black' />
            </Link>

            <AddPost open={isAddOpen} onClose={handleCloseAdd} />
        </Stack>
    )
}

export default Navbar

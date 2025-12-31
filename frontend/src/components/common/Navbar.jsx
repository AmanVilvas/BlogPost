import { Stack, useMediaQuery } from '@mui/material'
import { IoMdHome } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart, FaEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useState } from 'react';
import AddPost from '../../components/modals/AddPost'
import { useDispatch, useSelector } from 'react-redux';
import { addPostModel } from '../../redux/slice';


function Navbar() {
    const _300 = useMediaQuery('(min-width:300px)')
    // const [isAddOpen, setIsAddOpen] = useState(false)
    const dispatch = useDispatch()
    const {darkMode} = useSelector((state) => state.service)

    //dispatch is used to call the function of reducer to give some result/output

    const handleAddPost = () => {
        dispatch(addPostModel(true))
    }

    return (
        <Stack
            flexDirection={'row'}
            maxWidth={'100%'}
            alignItems={'center'}
            justifyContent={'space-around'}
        >
            <FiArrowLeft size={_300 ? 32 : 24 } 
            color={darkMode ? 'white' : 'black'}
            />
            <Link to={'/'} className='link'>
                <IoMdHome size={_300 ? 32 : 24} color={darkMode ? 'white' : 'black'} />
            </Link>

            <Link to={'/Search'}>
                <IoSearch size={_300 ? 32 : 24} color={darkMode ? 'white' : 'black'} />
            </Link>

                <FaRegHeart size={_300 ? 32 : 24} color={darkMode ? 'white' : 'black'} />

                <FaEdit size={_300 ? 32 : 24} color={darkMode ? 'white' : 'black'} className='image-icon' onClick={handleAddPost} style={{ cursor: 'pointer' }} />

            <Link to={'/profile/threads/1'}>
                <CgProfile size={_300 ? 32 : 24} color={darkMode ? 'white' : 'black'} />
            </Link>

            {/* <AddPost open={isAddOpen} onClose={handleCloseAdd} /> */}
        </Stack>
    )
}

export default Navbar

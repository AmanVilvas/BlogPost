import { Stack, useMediaQuery } from '@mui/material'
import { IoMdHome } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart, FaEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { NavLink, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { addPostModel } from '../../redux/slice';

function Navbar() {
    const _300 = useMediaQuery('(min-width:300px)')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { darkMode, myInfo } = useSelector((state) => state.service)

    const handleAddPost = () => {
        dispatch(addPostModel(true))
    }

    const iconColor = (isActive) =>
        isActive ? (darkMode ? '#fff' : '#000') : (darkMode ? '#888' : '#aaa')

    return (
        <Stack
            flexDirection={'row'}
            maxWidth={'100%'}
            alignItems={'center'}
            justifyContent={'space-around'}
        >
            <FiArrowLeft
                size={_300 ? 32 : 24}
                color={darkMode ? 'white' : 'black'}
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(-1)}
            />

            <NavLink to={'/'}>
                {({ isActive }) => (
                    <IoMdHome size={_300 ? 32 : 24} color={iconColor(isActive)} />
                )}
            </NavLink>

            <NavLink to={'/search'}>
                {({ isActive }) => (
                    <IoSearch size={_300 ? 32 : 24} color={iconColor(isActive)} />
                )}
            </NavLink>

            <FaRegHeart size={_300 ? 32 : 24} color={darkMode ? 'white' : 'black'} />

            <FaEdit
                size={_300 ? 32 : 24}
                color={darkMode ? 'white' : 'black'}
                className='image-icon'
                onClick={handleAddPost}
                style={{ cursor: 'pointer' }}
            />

            <NavLink to={`/profile/threads/${myInfo?._id}`}>
                {({ isActive }) => (
                    <CgProfile size={_300 ? 32 : 24} color={iconColor(isActive)} />
                )}
            </NavLink>
        </Stack>
    )
}

export default Navbar

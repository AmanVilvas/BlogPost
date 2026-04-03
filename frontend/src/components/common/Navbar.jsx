import { Stack, useMediaQuery } from '@mui/material'
import { IoMdHome } from "react-icons/io"
import { IoSearch } from "react-icons/io5"
import { FaRegHeart, FaEdit } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addPostModel } from '../../redux/slice'
import { useGetNotificationsQuery } from '../../redux/service'

function Navbar() {
    const dispatch = useDispatch()
    const { darkMode, myInfo } = useSelector((state) => state.service)

    const { data: notifData } = useGetNotificationsQuery(undefined, {
        pollingInterval: 5000,
        skip: !myInfo
    })
    const hasUnread = notifData?.notifications?.some(n => !n.read)

    const handleAddPost = () => dispatch(addPostModel(true))

    const activeColor = darkMode ? '#fff' : '#000'
    const inactiveColor = darkMode ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.35)'
    const iconSize = 26

    const iconStyle = (isActive) => ({
        color: isActive ? activeColor : inactiveColor,
        display: 'flex',
        alignItems: 'center',
        padding: '6px',
        borderRadius: '10px',
        transition: 'color 0.2s, background-color 0.2s',
    })

    return (
        <Stack
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-around'}
            width={'100%'}
            px={1}
        >
            <NavLink to={'/'}>
                {({ isActive }) => (
                    <span style={iconStyle(isActive)}>
                        <IoMdHome size={iconSize} />
                    </span>
                )}
            </NavLink>

            <NavLink to={'/search'}>
                {({ isActive }) => (
                    <span style={iconStyle(isActive)}>
                        <IoSearch size={iconSize} />
                    </span>
                )}
            </NavLink>

            <span
                style={{ ...iconStyle(false), cursor: 'pointer' }}
                onClick={handleAddPost}
            >
                <FaEdit size={iconSize} />
            </span>

            <NavLink to={'/activity'} className={hasUnread ? 'unread-shake' : ''}>
                {({ isActive }) => (
                    <span style={iconStyle(isActive)}>
                        <FaRegHeart size={iconSize} />
                    </span>
                )}
            </NavLink>

            <NavLink to={`/profile/threads/${myInfo?._id}`}>
                {({ isActive }) => (
                    <span style={iconStyle(isActive)}>
                        <CgProfile size={iconSize} />
                    </span>
                )}
            </NavLink>
        </Stack>
    )
}

export default Navbar

import { Stack } from '@mui/material'
import { IoMdHome} from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart, FaEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <Stack
        flexDirection={'row'}
        maxWidth={'100%'}
        alignItems={'center'}
        justifyContent={'space-around'}
        >   
        <Link to={'/'}>
            <IoMdHome size={28} />
        </Link>
        <Link to={'/Search'}>
        <IoSearch size={28}/>
        </Link>
        <Link to={'/Liked'}>
        <FaRegHeart size={28}/>
        </Link>
        <Link to={'/Edit'}>
        <FaEdit size={28}/>
        </Link>
        <Link to={'/Profile'}>
        <CgProfile size={28}/>
        </Link>
        </Stack>
    )
}

export default Navbar

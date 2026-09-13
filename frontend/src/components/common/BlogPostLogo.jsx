import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function BlogPostLogo({ height = 36 }) {
    const { darkMode } = useSelector((state) => state.service || {})

    return (
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
                src="/logo-bgremoved.png"
                alt="logo"
                style={{
                    height: height,
                    width: 'auto',
                    objectFit: 'contain',
                    filter: darkMode ? 'invert(1)' : 'none',
                    transition: 'filter 0.2s ease, transform 0.15s ease',
                    cursor: 'pointer',
                    display: 'block',
                }}
            />
        </Link>
    )
}

export default BlogPostLogo

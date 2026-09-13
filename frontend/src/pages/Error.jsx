import { Stack, Typography, Button, Box } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BlogPostLogo from '../components/common/BlogPostLogo'

function Error() {
    const navigate = useNavigate()

    return (
        <Stack
            width="100%"
            height="100vh"
            alignItems="center"
            justifyContent="center"
            sx={{
                bgcolor: 'background.default',
                color: 'text.primary',
                px: 3,
                textAlign: 'center',
            }}
        >
            <Box mb={3}>
                <BlogPostLogo height={56} />
            </Box>

            <Typography variant="h4" fontWeight={800} letterSpacing="-0.03em" mb={1}>
                Sorry, this page isn't available.
            </Typography>

            <Typography variant="body1" color="text.secondary" maxWidth={420} mb={4} sx={{ lineHeight: 1.5 }}>
                The link you followed may be broken, or the page may have been removed.
            </Typography>

            <Button
                className="threads-pill-btn"
                onClick={() => navigate('/')}
                sx={{ px: 4, py: 1.2, fontSize: '0.95rem !important' }}
            >
                Back to BlogPost
            </Button>
        </Stack>
    )
}

export default Error

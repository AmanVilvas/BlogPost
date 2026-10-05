import { createContext, useContext, useState } from 'react'
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const GuestAccessContext = createContext(null)

export function GuestAccessProvider({ children }) {
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState('join the conversation')

  const requestAccount = (nextAction) => {
    setAction(nextAction || 'join the conversation')
    setOpen(true)
  }

  return (
    <GuestAccessContext.Provider value={{ requestAccount }}>
      {children}
      <Dialog open={open} onClose={() => setOpen(false)} PaperProps={{ sx: { borderRadius: 4, p: 1, maxWidth: 400 } }}>
        <DialogTitle sx={{ fontWeight: 800, letterSpacing: '-.04em', fontSize: '1.45rem' }}>Make yourself at home.</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary" lineHeight={1.65}>
            Create a BlogPost account to {action}. It only takes a moment, and you can keep exploring in the meantime.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
          <Button onClick={() => setOpen(false)} sx={{ borderRadius: 99, color: 'text.secondary', textTransform: 'none' }}>Keep browsing</Button>
          <Button component={Link} to="/" onClick={() => setOpen(false)} className="threads-pill-btn" sx={{ px: 2.5 }}>Create account</Button>
        </DialogActions>
      </Dialog>
    </GuestAccessContext.Provider>
  )
}

export function useGuestAccess() {
  return useContext(GuestAccessContext) || { requestAccount: () => {} }
}

export function GuestWelcome() {
  const { requestAccount } = useGuestAccess()
  return (
    <Alert severity="info" icon={false} sx={{ mx: { xs: 2, md: 0 }, mb: 2, borderRadius: 3, alignItems: 'center', '& .MuiAlert-message': { width: '100%' } }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" gap={1.5}>
        <span><strong>Just looking around?</strong> Enjoy the posts. Make an account whenever you’re ready to join in.</span>
        <Button size="small" onClick={() => requestAccount('post, like, comment, or follow')} sx={{ flexShrink: 0, fontWeight: 700, textTransform: 'none' }}>How it works</Button>
      </Stack>
    </Alert>
  )
}

const RELOAD_KEY = 'blogpost.stale-deployment-reload'
const RELOAD_COOLDOWN_MS = 30_000

export function refreshForStaleDeployment() {
  if (import.meta.env.DEV || typeof window === 'undefined') return false

  try {
    const lastReload = Number(window.sessionStorage.getItem(RELOAD_KEY) || 0)
    if (Date.now() - lastReload < RELOAD_COOLDOWN_MS) return false
    window.sessionStorage.setItem(RELOAD_KEY, String(Date.now()))
    window.location.reload()
    return true
  } catch {
    return false
  }
}

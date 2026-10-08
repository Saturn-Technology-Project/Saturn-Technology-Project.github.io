export type DesktopPlatform = 'mac' | 'win' | 'other'

export function detectPlatform(): DesktopPlatform {
  if (typeof navigator === 'undefined') return 'other'
  const hint = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform
  const source = `${hint ?? ''} ${navigator.platform ?? ''} ${navigator.userAgent ?? ''}`
  if (/iPhone|iPad|iPod|Android/i.test(source)) return 'other'
  if (/Mac/i.test(source)) return 'mac'
  if (/Win/i.test(source)) return 'win'
  return 'other'
}

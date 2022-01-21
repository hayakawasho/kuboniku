import { wideQuery, mediaPrint } from '@/env'

export default function () {
  const handleBreakpointChange = () => {
    location.reload()
  }

  wideQuery.addEventListener('change', handleBreakpointChange)

  mediaPrint.addEventListener('change', e => {
    if (e.matches) {
      wideQuery.removeEventListener('change', handleBreakpointChange)
    } else {
      wideQuery.addEventListener('change', handleBreakpointChange)
    }
  })
}

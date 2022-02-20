// import { g } from '@/env'

export interface IManifestProps {
  id: string
  src: string
}

const manifest: IManifestProps[] = []

manifest.push({
  id: 'fonts',
  src: '/fonts/kuboniku.ttf',
})

export { manifest }

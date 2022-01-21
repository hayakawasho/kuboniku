// import { g } from '@/env'

export interface IManifestProps {
  id: string
  src: string
}

const manifest: IManifestProps[] = []

manifest.push({
  id: 'fonts',
  src: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&family=Noto+Sans+JP:wght@400;700&family=Roboto+Condensed:wght@400;700',
})

export { manifest }

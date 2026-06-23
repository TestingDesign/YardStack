import HomeDesktop from './HomeDesktop'
import HomeMobile from './HomeMobile'

interface HomeProps {
  viewMode?: 'desktop' | 'mobile'
}

export default function Home({ viewMode = 'desktop' }: HomeProps) {
  return viewMode === 'mobile' ? <HomeMobile viewMode={viewMode} /> : <HomeDesktop viewMode={viewMode} />
}

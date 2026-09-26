import './globals.css'
import './overrides.css'
import BootPopup from './components/BootPopup'
import GithubConnect from './components/GithubConnect'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Pit Wall — Flaky CI Detective', description: 'Find the tests burning your CI minutes.' }
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body><BootPopup /><GithubConnect />{children}</body></html> }

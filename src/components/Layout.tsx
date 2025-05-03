import { ReactNode } from 'react'
import Navigation from './Navigation'
import ThreeScene from './ThreeScene'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="dark">
      <Navigation />
      <ThreeScene />
      <main>{children}</main>
    </div>
  )
}
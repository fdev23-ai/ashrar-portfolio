import { profile } from '../data/resume'

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="container-px mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 text-sm text-mist sm:flex-row">
        <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        <p>Built with React, Tailwind &amp; Framer Motion.</p>
      </div>
    </footer>
  )
}

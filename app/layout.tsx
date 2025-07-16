import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Adarsh - Tech Versatile',
  description: 'Soon going to update',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

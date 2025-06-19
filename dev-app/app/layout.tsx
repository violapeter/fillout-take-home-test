import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'

import './globals.css'
import '@fillout/ui-components/theme/style.css'

const blMelodyMedium = localFont({
  src: './fonts/BLMelody-Medium.woff2',
  variable: '--font-brand',
  display: 'swap',
})

const inter = Inter({
  variable: '--font-default',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Fillout take home test',
  description:
    'This is the most incredible take home test you ever saw. So you have to hire me, I guess. ¯\\_(ツ)_/¯',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="43066077-83db-4f63-b0ae-7aa530b75435"
        />
      </head>
      <body
        className={`${inter.className} ${blMelodyMedium.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}

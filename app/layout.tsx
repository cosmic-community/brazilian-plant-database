import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CosmicBadge from '@/components/CosmicBadge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Brazilian Plant Database',
    template: '%s | Brazilian Plant Database'
  },
  description: 'A comprehensive digital encyclopedia showcasing Brazilian native plants, featuring detailed information about species, habitats, uses, and conservation status.',
  keywords: ['Brazilian plants', 'botany', 'plant database', 'Ipê', 'flora', 'conservation', 'ecology'],
  authors: [{ name: 'Brazilian Plant Database' }],
  creator: 'Brazilian Plant Database',
  publisher: 'Brazilian Plant Database',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Brazilian Plant Database',
    description: 'A comprehensive digital encyclopedia showcasing Brazilian native plants, featuring detailed information about species, habitats, uses, and conservation status.',
    siteName: 'Brazilian Plant Database',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brazilian Plant Database',
    description: 'A comprehensive digital encyclopedia showcasing Brazilian native plants, featuring detailed information about species, habitats, uses, and conservation status.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <script src="/dashboard-console-capture.js"></script>
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}
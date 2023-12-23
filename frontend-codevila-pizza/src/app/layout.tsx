import { Metadata } from 'next';
import '../../styles/globals.scss';
import { AuthProvider } from '../contexts/AuthContext'

export const metadata = {
  title: 'Codevila-pizza',
  description: 'by codevila',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body>
          <AuthProvider>
            {children}
          </AuthProvider>
        </body>
    </html>
  )
}

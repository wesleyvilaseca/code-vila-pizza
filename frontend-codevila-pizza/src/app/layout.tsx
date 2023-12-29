import { Metadata } from 'next';
import '../../styles/globals.scss';
import { AuthProvider } from '../contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            <ToastContainer autoClose={3000} />
          </AuthProvider>
        </body>
    </html>
  )
}

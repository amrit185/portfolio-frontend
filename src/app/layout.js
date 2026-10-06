// src/app/layout.js
import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'My Portfolio',
  description: 'Powered by a custom Headless CMS',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
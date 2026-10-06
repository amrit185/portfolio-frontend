// src/components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }, // <-- Add this!
  ];

  return (
    <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold tracking-tighter text-gray-900">
          Portfolio.
        </Link>
        <div className="space-x-6">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path} className="text-gray-600 hover:text-blue-600 text-sm font-medium">
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
'use client';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { signOut } from '@/lib/actions/auth-action';
type Session = typeof auth.$Infer.Session;
import { useRouter } from 'next/navigation';
const Header = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };
  return (
    <header className='bg-white shadow-sm border-b border-gray-100'>
      <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          {/* Logo */}
          <Link
            href='/'
            className='text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors'
          >
            Better Auth
          </Link>

          {/* Navigation */}
          <div className='flex items-center space-x-6'>
            {session && (
              <Link
                href='/dashboard'
                className='text-gray-600 hover:text-gray-900 transition-colors font-medium'
              >
                Dashboard
              </Link>
            )}
            {session && (
              <Button
                onClick={handleLogout}
                className='text-gray-600 hover:text-gray-900 transition-colors font-medium'
              >
                Logout
              </Button>
            )}
            {!session && (
              <Link
                href='/signin'
                className='text-gray-600 hover:text-gray-900 transition-colors font-medium'
              >
                Sign In
              </Link>
            )}
            {!session && (
              <Link
                href='/signup'
                className='text-gray-600 hover:text-gray-900 transition-colors font-medium'
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

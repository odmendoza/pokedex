'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, List, Zap, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // const lintTo = (href: string) => () => {
  //   // router.push(href);
  //   closeMenu();
  //   // router.push(href);
  //   // router.push(href);
  // };

  return (
    <nav className='pokemon-bg-blue/10 backdrop-blur supports-[backdrop-filter]:bg-white/10 sticky top-0 z-40 rounded-lg shadow-md m-2 md:m-4'>
      <div className='container mx-auto px-4 py-3'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <Link
            href='/'
            className='text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors'
          >
            <Image
              src='/pokemon.png'
              alt='Pokémon Logo'
              width={120}
              height={40}
              className='inline-block mr-2'
            />
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center gap-4'>
            <Link href='/'>
              <Button
                variant='ghost'
                size='sm'
                className='pokemon-text-primary pokemon-hover-yellow'
              >
                <Home className='w-4 h-4 mr-2' />
                Inicio
              </Button>
            </Link>
            <Link href='/pokemon'>
              <Button
                variant='ghost'
                size='sm'
                className='pokemon-text-primary pokemon-hover-yellow'
              >
                <Zap className='w-4 h-4 mr-2' />
                Pokedex
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <Button
              variant='ghost'
              size='sm'
              onClick={toggleMenu}
              className='hover:bg-blue-50'
              aria-label='Toggle menu'
            >
              {isMenuOpen ? (
                <X className='w-5 h-5' />
              ) : (
                <Menu className='w-5 h-5' />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden z-30 ${
            isMenuOpen ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='flex flex-col space-y-2 pb-4 border-t border-gray-200 pt-4 z-40'>
            <button
              type='button'
              className='pokemon-text-primary pokemon-hover-yellow flex items-center w-full text-left bg-transparent border-0 p-0 z-50'
              aria-label='Go to home'
              onClick={() => {
                closeMenu();
                router.push('/');
              }}
            >
              <Home className='w-4 h-4 mr-3' />
              Inicio
            </button>
            <button
              type='button'
              className='pokemon-text-primary pokemon-hover-yellow flex items-center w-full text-left bg-transparent border-0 p-0 z-50'
              aria-label='Go to Pokedex'
              onClick={() => {
                closeMenu();
                router.push('/pokemon');
              }}
            >
              <List className='w-4 h-4 mr-3' />
              Lista de Pokémon
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className='md:hidden fixed inset-0 bg-opacity-20 z-40'
          onClick={closeMenu}
          aria-hidden='true'
        />
      )}
    </nav>
  );
}

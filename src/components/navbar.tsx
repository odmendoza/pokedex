'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, List, Zap, Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className='pokemon-bg-blue/10 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50'>
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
                className='pokemon-text-blue hover:pokemon-bg-primary'
              >
                <Home className='w-4 h-4 mr-2' />
                Inicio
              </Button>
            </Link>
            <Link href='/pokemon'>
              <Button
                variant='ghost'
                size='sm'
                className='pokemon-text-blue hover:pokemon-bg-primary'
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
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='flex flex-col space-y-2 pb-4 border-t border-gray-200 pt-4'>
            <Link href='/' onClick={closeMenu}>
              <Button
                variant='ghost'
                size='sm'
                className='w-full justify-start hover:bg-blue-50'
              >
                <Home className='w-4 h-4 mr-3' />
                Inicio
              </Button>
            </Link>
            <Link href='/pokemon' onClick={closeMenu}>
              <Button
                variant='ghost'
                size='sm'
                className='w-full justify-start hover:bg-blue-50'
              >
                <List className='w-4 h-4 mr-3' />
                Lista de Pokémons
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className='md:hidden fixed inset-0 bg-black bg-opacity-20 z-40'
          onClick={closeMenu}
          aria-hidden='true'
        />
      )}
    </nav>
  );
}

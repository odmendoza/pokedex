import { Suspense } from 'react';
import PokemonList from '@/components/pokemon-list';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function PokemonListPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-8'>
        <div>
          <h1 className='text-4xl font-bold pokemon-text-primary'>
            Pokédex
          </h1>
        </div>
        <Link href='/pokemon/create'>
          <Button>
            <Plus className='w-4 h-4 mr-2' />
            <span className='hidden md:flex'>Crear Pokémon</span>
            <span className='flex md:hidden'>Nuevo</span>
          </Button>
        </Link>
      </div>

      <Suspense fallback={<div>Cargando pokémons...</div>}>
        <PokemonList />
      </Suspense>
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getPokemons } from '@/lib/actions/pokemon';
import { Pokemon } from '@/lib/definitions/pokemon';
import { useLoading } from '@/lib/store/loading';

export default function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const { setLoading } = useLoading();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const fetchPokemons = useCallback(async () => {
    setLoading(true);
    try {
      const offset = (currentPage - 1) * 20;
      const data = await getPokemons(20, offset);
      setPokemons(data);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, setLoading]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  const allPokemons = [...pokemons];
  const filteredPokemons = allPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className='mb-6'>
        <div className='relative'>
          <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
          <Input
            placeholder='Buscar pokémons ...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {filteredPokemons.map((pokemon) => (
          <Card
            key={pokemon.number}
            onClick={() => router.push(`/pokemon/${pokemon.number}`)}
            className='hover:shadow-lg transition-shadow'
          >
            <CardHeader className='text-center'>
              <div className='mx-auto'>
                <Image
                  src={
                    pokemon.pokemonPhotoUrl ||
                    '/logo.png'
                  }
                  alt={pokemon.name}
                  width={120}
                  height={120}
                  className='mx-auto'
                />
              </div>
              <CardTitle className='capitalize'>{pokemon.name}</CardTitle>
              <div className='flex flex-wrap gap-1 justify-center'>
                {pokemon.type?.map((type) => (
                  <Badge key={type} variant='secondary' className='uppercase'>
                    {type}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <p className='text-center font-bold'>N° {pokemon.number}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='flex justify-center gap-2 mt-8'>
        <Button
          variant='outline'
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <span className='flex items-center px-4'>Página {currentPage}</span>
        <Button
          variant='outline'
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Siguiente
        </Button>
      </div>
    </div>
  );
}

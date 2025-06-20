'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Edit, Trash2, Eye, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Pokemon {
  id: number;
  name: string;
  url: string;
  sprites?: {
    front_default: string;
  };
  types?: Array<{
    type: {
      name: string;
    };
  }>;
}

export default function PokemonList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [customPokemons, setCustomPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetchPokemons();
    loadCustomPokemons();
  }, [currentPage]);

  const fetchPokemons = async () => {
    try {
      const offset = (currentPage - 1) * 20;
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
      );
      const data = await res.json();

      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const detailRes = await fetch(pokemon.url);
          return detailRes.json();
        })
      );

      setPokemons(pokemonDetails);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadCustomPokemons = () => {
    const saved = localStorage.getItem('customPokemons');
    if (saved) {
      setCustomPokemons(JSON.parse(saved));
    }
  };

  const deletePokemon = (id: number) => {
    const updated = customPokemons.filter((p) => p.id !== id);
    setCustomPokemons(updated);
    localStorage.setItem('customPokemons', JSON.stringify(updated));
  };

  const allPokemons = [...customPokemons, ...pokemons];
  const filteredPokemons = allPokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className='text-center py-8'>Cargando pokémons...</div>;
  }

  return (
    <div>
      <div className='mb-6'>
        <div className='relative'>
          <Search className='absolute left-3 top-3 h-4 w-4 text-gray-400' />
          <Input
            placeholder='Buscar pokémons...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='pl-10'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {filteredPokemons.map((pokemon) => (
          <Card key={pokemon.id} className='hover:shadow-lg transition-shadow'>
            <CardHeader className='text-center'>
              <div className='mx-auto mb-4'>
                <Image
                  src={
                    pokemon.sprites?.front_default ||
                    '/placeholder.svg?height=96&width=96'
                  }
                  alt={pokemon.name}
                  width={96}
                  height={96}
                  className='mx-auto'
                />
              </div>
              <CardTitle className='capitalize'>{pokemon.name}</CardTitle>
              <div className='flex flex-wrap gap-1 justify-center'>
                {pokemon.types?.map((type) => (
                  <Badge key={type.type.name} variant='secondary'>
                    {type.type.name}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className='flex gap-2'>
                <Link href={`/pokemon/${pokemon.id}`} className='flex-1'>
                  <Button variant='outline' size='sm' className='w-full'>
                    <Eye className='w-4 h-4 mr-1' />
                    Ver
                  </Button>
                </Link>
                <Link href={`/pokemon/edit/${pokemon.id}`} className='flex-1'>
                  <Button variant='outline' size='sm' className='w-full'>
                    <Edit className='w-4 h-4 mr-1' />
                    Editar
                  </Button>
                </Link>
                {customPokemons.some((p) => p.id === pokemon.id) && (
                  <Button
                    variant='destructive'
                    size='sm'
                    onClick={() => deletePokemon(pokemon.id)}
                  >
                    <Trash2 className='w-4 h-4' />
                  </Button>
                )}
              </div>
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

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface PokemonDetailProps {
  pokemon: {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
      front_default: string;
      back_default: string;
    };
    types: Array<{
      type: {
        name: string;
      };
    }>;
    stats: Array<{
      base_stat: number;
      stat: {
        name: string;
      };
    }>;
    abilities: Array<{
      ability: {
        name: string;
      };
    }>;
  };
}

export default function PokemonDetail({ pokemon }: PokemonDetailProps) {
  const deletePokemon = (id: number) => {
    // const updated = customPokemons.filter((p) => p.id !== id);
    // setCustomPokemons(updated);
    localStorage.setItem('customPokemons', JSON.stringify(id));
  };
  return (
    <div>
      <div className='flex items-center justify-between gap-4 mb-8'>
        <Link href='/pokemon'>
          <Button variant='outline'>
            <ArrowLeft className='w-4 h-4 mr-2' />
            Volver
          </Button>
        </Link>
        <div className='flex items-center gap-2'>
          <Link href={`/pokemon/edit/${pokemon.id}`}>
            <Button>
              <Edit className='w-4 h-4 md:mr-2' />
              <span className='hidden md:flex'>Editar</span>
            </Button>
          </Link>
          <Button
            variant='destructive'
            onClick={() => deletePokemon(pokemon.id)}
          >
            <Trash2 className='w-4 h-4 md:mr-2' />
            <span className='hidden md:flex'>Eliminar</span>
          </Button>
        </div>
      </div>

      <div className='grid lg:grid-cols-2 gap-8'>
        <div className='flex justify-center gap-4 md:mb-6 pokemon-bg-blue/10 backdrop-blur supports-[backdrop-filter]:bg-white/10 sticky top-0 z-50 rounded-lg shadow-md'>
          <Image
            src={pokemon.sprites.front_default || '/placeholder.svg'}
            alt={`${pokemon.name} front`}
            width={256}
            height={256}
          />
        </div>
        <div className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>
                <div className='flex items-center justify-between'>
                  <span className='text-2xl font-bold capitalize'>
                    {pokemon.name}
                  </span>
                  <span className='text-gray-500'># {pokemon.id}</span>
                </div>

                <div className='flex flex-wrap gap-2 pt-4'>
                  {pokemon.types.map((type) => (
                    <span
                      key={type.type.name}
                      className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {/* Description */}
              <p className='text-gray-700'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptatem, quas. Blanditiis facere quasi non? Recusandae
                architecto aliquid alias obcaecati, rem qui voluptates commodi
                maxime assumenda. Odit accusantium illum quibusdam eveniet.
              </p>
              {/* Height, Weight, gender ratio, Abilities, egg groups, evolutions */}
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <h3 className='font-semibold'>Altura</h3>
                  <p>{pokemon.height / 10} m</p>
                </div>
                <div>
                  <h3 className='font-semibold'>Peso</h3>
                  <p>{pokemon.weight / 10} kg</p>
                </div>
                <div>
                  <h3 className='font-semibold'>Proporción de género</h3>
                  <p>{pokemon.weight / 10}% - {pokemon.weight / 10}%</p>
                </div>
                <div>
                  <h3 className='font-semibold'>Habilidades</h3>
                  <ul className='list-disc pl-5'>
                    {pokemon.abilities.map((ability) => (
                      <li key={ability.ability.name}>{ability.ability.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

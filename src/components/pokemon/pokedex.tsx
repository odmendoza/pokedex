'use client';

import { useCallback, useEffect, useState } from 'react';
import { Shuffle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Pokemon } from '@/lib/definitions/pokemon';
import { getRandomPokemonFromAPI } from '@/lib/actions/pokemon';
import { useLoading } from '@/lib/store/loading';

export default function Pokedex() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const { loading, setLoading } = useLoading();

  const getRandomPokemon = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getRandomPokemonFromAPI();
      setPokemon(response.data as Pokemon);
    } catch (error) {
      console.error('Error fetching pokemon:', error);
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  useEffect(() => {
    getRandomPokemon();
  }, [getRandomPokemon]);

  return (
    <div className='w-full max-w-2xl mx-auto'>
      <div className='bg-gradient-to-b from-red-500 to-red-600 rounded-3xl p-8 shadow-2xl border-8 border-red-700'>
        <div className='flex items-center justify-between mb-8'>
          <button
            className='w-20 h-20 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full border-4 border-black shadow-inner hover:from-cyan-300 hover:to-cyan-400 transition-all duration-200 flex items-center justify-center'
          >
          </button>
          <div className='w-16 h-16 bg-white rounded-full border-4 border-black shadow-inner relative'>
            <div className='absolute top-0 left-0 w-full h-1/2 bg-red-500 rounded-t-full'></div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-black'></div>
            <div className='absolute top-1/2 left-0 w-full h-0.5 bg-black'></div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-4 md:gap-8 justify-center'>
          <div>
            <div className='bg-gray-100 rounded-lg border-4 border-black shadow-inner md:mb-6 aspect-square flex items-center justify-center'>
              {pokemon ? (
                <div className='relative w-full h-full p-8 flex items-center justify-center'>
                  <Image
                    src={pokemon.pokemonPhotoUrl || '/logo.png'}
                    alt={pokemon.name}
                    width={256}
                    height={256}
                    className='object-contain max-w-full max-h-full drop-shadow-lg'
                  />
                </div>
              ) : (
                <div className='text-center text-gray-400'>
                  <div className='w-32 h-32 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center'>
                    <Shuffle className='w-16 h-16 text-gray-400' />
                  </div>
                  <p className='text-lg font-mono'>PRESS BLUE BUTTON</p>
                  <p className='text-lg font-mono'>TO START</p>
                </div>
              )}
            </div>

            <div className='hidden md:flex flex-row items-center justify-center gap-2 md:gap-4 md:mb-6'>
              <div className='relative'>
                <div className='grid grid-cols-3 gap-1 w-20 h-20'>
                  <div></div>
                  <div className='bg-gray-800 rounded border-2 border-gray-900 flex items-center justify-center hover:bg-gray-700 cursor-pointer'>
                    <div className='w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-gray-600'></div>
                  </div>
                  <div></div>
                  <div className='bg-gray-800 rounded border-2 border-gray-900 flex items-center justify-center hover:bg-gray-700 cursor-pointer'>
                    <div className='w-0 h-0 border-t-2 border-b-2 border-r-4 border-transparent border-r-gray-600'></div>
                  </div>
                  <div className='bg-gray-900 rounded border-2 border-black'></div>
                  <div className='bg-gray-800 rounded border-2 border-gray-900 flex items-center justify-center hover:bg-gray-700 cursor-pointer'>
                    <div className='w-0 h-0 border-t-2 border-b-2 border-l-4 border-transparent border-l-gray-600'></div>
                  </div>
                  <div></div>
                  <div className='bg-gray-800 rounded border-2 border-gray-900 flex items-center justify-center hover:bg-gray-700 cursor-pointer'>
                    <div className='w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-gray-600'></div>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className='flex flex-col gap-3'>
                <button
                  onClick={getRandomPokemon}
                  disabled={loading}
                  className='w-36 h-12 pokemon-bg-primary pokemon-hover-blue rounded-2xl border-2 border-black shadow-inner flex items-center justify-center'
                >
                  Buscar
                </button>
                {pokemon && (
                  <Link href={`/pokemon/${pokemon.number}`}>
                    <button className='w-36 h-12 pokemon-bg-orange pokemon-hover-blue rounded-2xl border-2 border-black shadow-inner flex items-center justify-center'>
                      {' '}
                      Ver más
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <div className='w-full md:w-7/12 bg-gradient-to-b from-gray-600 to-gray-700 rounded-2xl p-6 border-4 border-black shadow-inner'>
            <div className='bg-gradient-to-r from-green-400 to-green-500 rounded-lg p-3 mb-4 border-2 border-black'>
              <div className='space-y-2'>
                <div className='flex justify-between items-center'>
                  <span className='font-bold text-black font-mono text-sm'>
                    NOMBRE: <br />{' '}
                    {pokemon ? pokemon.name.toUpperCase() : '---'}
                  </span>
                  <span className='font-bold text-black font-mono text-sm'>
                    TIPO(S): <br />{' '}
                    {pokemon
                      ? pokemon.type.map((t) => t.toUpperCase()).join(', ')
                      : '---'}
                  </span>
                </div>
              </div>
            </div>

            <div className='bg-gradient-to-r from-green-400 to-green-500 rounded-lg p-3 mb-4 border-2 border-black'>
              <div className='space-y-2'>
                <div className='flex justify-between items-center'>
                  <span className='font-bold text-black font-mono text-sm'>
                    ALTURA: <br />{' '}
                    {pokemon ? `${(pokemon.height!).toFixed(1)} M` : '---'}
                  </span>
                  <span className='font-bold text-black font-mono text-sm'>
                    PESO: <br />{' '}
                    {pokemon
                      ? `${(pokemon.weight!).toFixed(1)} KG`
                      : '---'}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex-1'>
                <div className='bg-gradient-to-br from-green-400 to-green-500 rounded-lg p-4 border-2 border-black min-h-[120px] flex items-center justify-center'>
                  <p className='text-black font-mono text-sm leading-relaxed text-center'>
                    {pokemon
                      ? pokemon.description!
                      : 'PUT A DESCRIPTION IN HERE!'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex md:hidden flex-row items-center justify-center gap-4 mb-6'>
            <div className='relative'>
              <div className='grid grid-cols-3 gap-1 w-20 h-20'>
                <div></div>
                <div className='bg-gray-800 rounded border-2 border-gray-900 flex items-center justify-center hover:bg-gray-700 cursor-pointer'>
                  <div className='w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-gray-600'></div>
                </div>
                <div></div>
                <div className='bg-gray-800 rounded border-2 border-gray-900 flex items-center justify-center hover:bg-gray-700 cursor-pointer'>
                  <div className='w-0 h-0 border-t-2 border-b-2 border-r-4 border-transparent border-r-gray-600'></div>
                </div>
                <div className='bg-gray-900 rounded border-2 border-black'></div>
                <div className='bg-gray-800 rounded border-2 border-gray-900 flex items-center justify-center hover:bg-gray-700 cursor-pointer'>
                  <div className='w-0 h-0 border-t-2 border-b-2 border-l-4 border-transparent border-l-gray-600'></div>
                </div>
                <div></div>
                <div className='bg-gray-800 rounded border-2 border-gray-900 flex items-center justify-center hover:bg-gray-700 cursor-pointer'>
                  <div className='w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-gray-600'></div>
                </div>
                <div></div>
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <button
                onClick={getRandomPokemon}
                disabled={loading}
                className='w-36 h-12 pokemon-bg-primary pokemon-hover-blue rounded-2xl border-2 border-black shadow-inner flex items-center justify-center'
              >
                Buscar
              </button>
              {pokemon && (
                <Link href={`/pokemon/${pokemon.id}`}>
                  <button className='w-36 h-12 pokemon-bg-orange pokemon-hover-blue rounded-2xl border-2 border-black shadow-inner flex items-center justify-center'>
                    {' '}
                    Ver más
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

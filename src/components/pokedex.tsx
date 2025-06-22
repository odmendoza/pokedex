'use client';

import { useState } from 'react';
import { Shuffle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string;
    };
  }>;
  species: {
    url: string;
  };
}

interface PokemonSpecies {
  flavor_text_entries: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
}

export default function Pokedex() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [description, setDescription] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const getRandomPokemon = async () => {
    setLoading(true);
    try {
      const randomId = Math.floor(Math.random() * 1010) + 1;

      const pokemonRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      const pokemonData = await pokemonRes.json();

      const speciesRes = await fetch(pokemonData.species.url);
      const speciesData: PokemonSpecies = await speciesRes.json();

      const spanishEntry = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === 'es'
      );
      const englishEntry = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === 'en'
      );

      const flavorText =
        spanishEntry?.flavor_text ||
        englishEntry?.flavor_text ||
        'Descripción no disponible';

      setPokemon(pokemonData);
      setDescription(flavorText.replace(/\f/g, ' ').replace(/\n/g, ' '));
    } catch (error) {
      console.error('Error fetching pokemon:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full max-w-2xl mx-auto'>
      <div className='bg-gradient-to-b from-red-500 to-red-600 rounded-3xl p-8 shadow-2xl border-8 border-red-700'>
        <div className='flex items-center justify-between mb-8'>
          {/* Large Blue Button */}
          <button
            // onClick={getRandomPokemon}
            // disabled={loading}
            className='w-20 h-20 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full border-4 border-black shadow-inner hover:from-cyan-300 hover:to-cyan-400 transition-all duration-200 flex items-center justify-center'
          >
            {/* {loading ? (
              <Loader2 className='w-8 h-8 text-black animate-spin' />
            ) : (
              <Shuffle className='w-8 h-8 text-black' />
            )} */}
          </button>

          {/* Title */}
          {/* <div className='flex-1 text-center'>
            <h1
              className='text-2xl font-bold text-black tracking-wider'
              style={{ fontFamily: 'monospace' }}
            >
              POKÉDEX OF
            </h1>
            <h2
              className='text-2xl font-bold text-black tracking-wider'
              style={{ fontFamily: 'monospace' }}
            >
              ANOMALIES
            </h2>
          </div> */}

          {/* Pokéball Button */}
          <div className='w-16 h-16 bg-white rounded-full border-4 border-black shadow-inner relative'>
            <div className='absolute top-0 left-0 w-full h-1/2 bg-red-500 rounded-t-full'></div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full border-2 border-black'></div>
            <div className='absolute top-1/2 left-0 w-full h-0.5 bg-black'></div>
          </div>
        </div>

        <div className='flex flex-col md:flex-row gap-4 md:gap-8 justify-center'>
          <div>
            {/* Main Display Screen */}
            <div className='bg-gray-100 rounded-lg border-4 border-black shadow-inner md:mb-6 aspect-square flex items-center justify-center'>
              {pokemon ? (
                <div className='relative w-full h-full p-8 flex items-center justify-center'>
                  <Image
                    src={
                      pokemon.sprites.other['official-artwork'].front_default ||
                      pokemon.sprites.front_default ||
                      '/placeholder.svg?height=300&width=300' ||
                      '/placeholder.svg' ||
                      '/placeholder.svg'
                    }
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
              {/* D-Pad */}
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

              {/* Action Buttons */}
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

          {/* Bottom Control Panel */}
          <div className='w-full md:w-7/12 bg-gradient-to-b from-gray-600 to-gray-700 rounded-2xl p-6 border-4 border-black shadow-inner'>
            {/* Info Bar */}
            <div className='bg-gradient-to-r from-green-400 to-green-500 rounded-lg p-3 mb-4 border-2 border-black'>
              <div className='space-y-2'>
                <div className='flex justify-between items-center'>
                  <span className='font-bold text-black font-mono text-sm'>
                    NOMBRE: <br /> {pokemon ? pokemon.name.toUpperCase() : '---'}
                  </span>
                  <span className='font-bold text-black font-mono text-sm'>
                    TIPO(S): <br /> {' '}
                    {pokemon
                      ? pokemon.types
                          .map((t) => t.type.name.toUpperCase())
                          .join(', ')
                      : '---'}
                  </span>
                </div>
              </div>
            </div>

            <div className='bg-gradient-to-r from-green-400 to-green-500 rounded-lg p-3 mb-4 border-2 border-black'>
              <div className='space-y-2'>
                <div className='flex justify-between items-center'>
                  <span className='font-bold text-black font-mono text-sm'>
                    ALTURA: <br /> {' '}
                    {pokemon ? `${(pokemon.height / 10).toFixed(1)} M` : '---'}
                  </span>
                  <span className='font-bold text-black font-mono text-sm'>
                    PESO: <br /> {' '}
                    {pokemon ? `${(pokemon.weight / 10).toFixed(1)} KG` : '---'}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex items-center justify-between'>
              {/* Description Screen */}
              <div className='flex-1'>
                <div className='bg-gradient-to-br from-green-400 to-green-500 rounded-lg p-4 border-2 border-black min-h-[120px] flex items-center justify-center'>
                  <p className='text-black font-mono text-sm leading-relaxed text-center'>
                    {pokemon ? description : 'PUT A DESCRIPTION IN HERE!'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='flex md:hidden flex-row items-center justify-center gap-4 mb-6'>
            {/* D-Pad */}
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

            {/* Action Buttons */}
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

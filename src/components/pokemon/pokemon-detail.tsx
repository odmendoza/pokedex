'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Pokemon } from '@/lib/definitions/pokemon';
import { useState } from 'react';
import { toast } from 'sonner';
import { deletePokemon } from '@/lib/actions/pokemon';

interface PokemonDetailProps {
  pokemon: Pokemon;
}

export default function PokemonDetail({ pokemon }: PokemonDetailProps) {
  const [open, setOpen] = useState(false);

  const _deletePokemon = async (id: string) => {
    const response = await deletePokemon(id);
    if (response.message && response.icon) {
      if (response.icon === 'success') {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    }
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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant='destructive' onClick={() => setOpen(true)}>
                <Trash2 className='w-4 h-4 md:mr-2' />
                <span className='hidden md:flex'>Eliminar</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>¿Eliminar Pokémon?</DialogTitle>
                <DialogDescription>
                  Esta acción no se puede deshacer. ¿Estás seguro de que quieres
                  eliminar este Pokémon?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant='outline' onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  variant='destructive'
                  onClick={() => {
                    _deletePokemon(pokemon.number);
                    setOpen(false);
                  }}
                >
                  Eliminar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className='grid lg:grid-cols-2 gap-8'>
        <div className='flex justify-center gap-4 md:mb-6 pokemon-bg-blue/10 backdrop-blur supports-[backdrop-filter]:bg-white/10 sticky top-0 z-50 rounded-lg shadow-md'>
          <Image
            src={pokemon.pokemonPhotoUrl || '/placeholder.svg'}
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
                  <span className='text-gray-500'># {pokemon.number}</span>
                </div>

                <div className='flex flex-wrap gap-2 pt-4'>
                  {pokemon.type.map((type) => (
                    <span
                      key={type}
                      className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm'
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {/* Description */}
              <p className='text-gray-700'>
                {pokemon.description || 'No hay descripción disponible.'}
              </p>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <h3 className='font-semibold'>Altura</h3>
                  <p>{pokemon.height!} m</p>
                </div>

                <div>
                  <h3 className='font-semibold'>Peso</h3>
                  <p>{pokemon.weight!} kg</p>
                </div>

                <div>
                  <h3 className='font-semibold'>Proporción de género</h3>
                  <p>
                    {pokemon.maleGenderRatio}% ♂ -{' '}
                    {pokemon.femaleGenderRatio}% ♀
                  </p>
                </div>
              </div>

              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div>
                  <h3 className='font-semibold'>Habilidades</h3>
                  <ul className='list-disc pl-5'>
                    {pokemon.abilities.map((ability) => (
                      <li key={ability}>{ability}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className='font-semibold'>Grupos de huevos</h3>
                  <ul className='list-disc pl-5'>
                    {pokemon.eggGroups.map((eg) => (
                      <li key={eg}>{eg}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className='flex flex-col'>
                <h3 className='font-semibold'>Evolución</h3>
                <p className='text-gray-700'>
                  {pokemon.description || 'No hay descripción disponible.'}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

'use client';

import type React from 'react';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

interface PokemonFormProps {
  pokemon?: any;
  isEdit?: boolean;
}

const pokemonTypes = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];

export default function PokemonForm({
  pokemon,
  isEdit = false,
}: PokemonFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: pokemon?.name || '',
    height: pokemon?.height || '',
    weight: pokemon?.weight || '',
    type1: pokemon?.types?.[0]?.type?.name || 'normal',
    type2: pokemon?.types?.[1]?.type?.name || 'none',
    hp: pokemon?.stats?.find((s: any) => s.stat.name === 'hp')?.base_stat || '',
    attack:
      pokemon?.stats?.find((s: any) => s.stat.name === 'attack')?.base_stat ||
      '',
    defense:
      pokemon?.stats?.find((s: any) => s.stat.name === 'defense')?.base_stat ||
      '',
    speed:
      pokemon?.stats?.find((s: any) => s.stat.name === 'speed')?.base_stat ||
      '',
    imageUrl: pokemon?.sprites?.front_default || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPokemon = {
      id: isEdit ? pokemon.id : Date.now(),
      name: formData.name,
      height: Number.parseInt(formData.height),
      weight: Number.parseInt(formData.weight),
      sprites: {
        front_default:
          formData.imageUrl || '/placeholder.svg?height=96&width=96',
      },
      types: [
        { type: { name: formData.type1 } },
        ...(formData.type2 && formData.type2 !== 'none'
          ? [{ type: { name: formData.type2 } }]
          : []),
      ],
      stats: [
        { stat: { name: 'hp' }, base_stat: Number.parseInt(formData.hp) },
        {
          stat: { name: 'attack' },
          base_stat: Number.parseInt(formData.attack),
        },
        {
          stat: { name: 'defense' },
          base_stat: Number.parseInt(formData.defense),
        },
        { stat: { name: 'speed' }, base_stat: Number.parseInt(formData.speed) },
      ],
      abilities: [],
    };

    const saved = localStorage.getItem('customPokemons');
    const customPokemons = saved ? JSON.parse(saved) : [];

    if (isEdit) {
      const index = customPokemons.findIndex((p: any) => p.id === pokemon.id);
      if (index !== -1) {
        customPokemons[index] = newPokemon;
      }
    } else {
      customPokemons.push(newPokemon);
    }

    localStorage.setItem('customPokemons', JSON.stringify(customPokemons));
    router.push('/pokemon');
  };

  return (
    <Card>
      <CardHeader>
        <div className='flex items-center gap-4'>
          <Link href='/pokemon'>
            <Button variant='outline' size='sm'>
              <ArrowLeft className='w-4 h-4 mr-2' />
              Volver
            </Button>
          </Link>
          <CardTitle>{isEdit ? 'Editar' : 'Crear'} Pokémon</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='name'>Nombre</Label>
              <Input
                id='name'
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor='imageUrl'>URL de Imagen</Label>
              <Input
                id='imageUrl'
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                placeholder='https://ejemplo.com/imagen.png'
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='height'>Altura (decímetros)</Label>
              <Input
                id='height'
                type='number'
                value={formData.height}
                onChange={(e) =>
                  setFormData({ ...formData, height: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor='weight'>Peso (hectogramos)</Label>
              <Input
                id='weight'
                type='number'
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <Label htmlFor='type1'>Tipo Principal</Label>
              <Select
                value={formData.type1}
                onValueChange={(value) =>
                  setFormData({ ...formData, type1: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Seleccionar tipo' />
                </SelectTrigger>
                <SelectContent>
                  {pokemonTypes.map((type) => (
                    <SelectItem key={type} value={type} className='capitalize'>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor='type2'>Tipo Secundario (Opcional)</Label>
              <Select
                value={formData.type2}
                onValueChange={(value) =>
                  setFormData({ ...formData, type2: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder='Seleccionar tipo' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='none'>Ninguno</SelectItem>
                  {pokemonTypes.map((type) => (
                    <SelectItem key={type} value={type} className='capitalize'>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            <div>
              <Label htmlFor='hp'>HP</Label>
              <Input
                id='hp'
                type='number'
                min='1'
                max='255'
                value={formData.hp}
                onChange={(e) =>
                  setFormData({ ...formData, hp: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor='attack'>Ataque</Label>
              <Input
                id='attack'
                type='number'
                min='1'
                max='255'
                value={formData.attack}
                onChange={(e) =>
                  setFormData({ ...formData, attack: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor='defense'>Defensa</Label>
              <Input
                id='defense'
                type='number'
                min='1'
                max='255'
                value={formData.defense}
                onChange={(e) =>
                  setFormData({ ...formData, defense: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label htmlFor='speed'>Velocidad</Label>
              <Input
                id='speed'
                type='number'
                min='1'
                max='255'
                value={formData.speed}
                onChange={(e) =>
                  setFormData({ ...formData, speed: e.target.value })
                }
                required
              />
            </div>
          </div>

          <Button type='submit' className='w-full'>
            <Save className='w-4 h-4 mr-2' />
            {isEdit ? 'Actualizar' : 'Crear'} Pokémon
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

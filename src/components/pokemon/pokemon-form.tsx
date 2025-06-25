'use client';

import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createPokemon, updatePokemon } from '@/lib/actions/pokemon';
import type { Pokemon } from '@prisma/client'; // Import Prisma's generated type
import { useRouter } from 'next/navigation';

interface PokemonFormProps {
  pokemon?: Pokemon; // Optional for editing
  formType: 'create' | 'edit';
}

export function PokemonForm({ pokemon, formType }: PokemonFormProps) {
  const router = useRouter();
  const initialState = { message: null, errors: {} };

  const actionFunction =
    formType === 'create'
      ? createPokemon
      : async (prevState: typeof initialState, formData: FormData) => {
          if (!pokemon?.id) {
            // This case should ideally not happen if formType is 'edit' and pokemon is undefined
            return {
              ...prevState,
              message: 'Error: Pokemon ID is missing for update.',
            };
          }
          return updatePokemon(pokemon.id, prevState, formData);
        };

  const [state, formAction, isPending] = useActionState(
    actionFunction,
    initialState
  );

  const handleCancel = () => {
    router.push('/pokemon');
  };

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardHeader>
        <CardTitle>
          {formType === 'create'
            ? 'Nuevo Pokemon'
            : `Editar Pokemon: ${pokemon?.name}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          action={formAction}
          className='grid grid-cols-1 md:grid-cols-2 gap-4'
        >
          <div className='space-y-2 col-span-1'>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              name='name'
              defaultValue={pokemon?.name}
              required
            />
            {state?.errors?.name && (
              <p className='text-red-500 text-sm'>
                {state.errors.name.join(', ')}
              </p>
            )}
          </div>
          <div className='space-y-2 col-span-1'>
            <Label htmlFor='number'>N°</Label>
            <Input
              id='number'
              name='number'
              defaultValue={pokemon?.number}
              required
            />
            {state?.errors?.number && (
              <p className='text-red-500 text-sm'>
                {state.errors.number.join(', ')}
              </p>
            )}
          </div>

          <div className='space-y-2 col-span-2'>
            <Label htmlFor='pokemonPhotoUrl'>Pokemon Photo URL</Label>
            <Input
              id='pokemonPhotoUrl'
              name='pokemonPhotoUrl'
              defaultValue={pokemon?.pokemonPhotoUrl || ''}
              type='url'
              placeholder='https://example.com/pokemon.png'
            />
            {state?.errors?.pokemonPhotoUrl && (
              <p className='text-red-500 text-sm'>
                {state.errors.pokemonPhotoUrl.join(', ')}
              </p>
            )}
          </div>

          <div className='space-y-2 col-span-2'>
            <Label htmlFor='type'>Type (comma-separated)</Label>
            <Input
              id='type'
              name='type'
              defaultValue={pokemon?.type?.join(', ') || ''}
              placeholder='e.g., Grass, Poison'
            />
            {state?.errors?.type && (
              <p className='text-red-500 text-sm'>
                {state.errors.type.join(', ')}
              </p>
            )}
          </div>

          <div className='space-y-2 col-span-2'>
            <Label htmlFor='description'>Description</Label>
            <Textarea
              id='description'
              name='description'
              defaultValue={pokemon?.description || ''}
              rows={3}
            />
            {state?.errors?.description && (
              <p className='text-red-500 text-sm'>
                {state.errors.description.join(', ')}
              </p>
            )}
          </div>

          <div className='space-y-2 col-span-1'>
            <Label htmlFor='height'>Height (m)</Label>
            <Input
              id='height'
              name='height'
              defaultValue={pokemon?.height || ''}
              type='number'
              step='0.1'
            />
            {state?.errors?.height && (
              <p className='text-red-500 text-sm'>
                {state.errors.height.join(', ')}
              </p>
            )}
          </div>
          <div className='space-y-2 col-span-1'>
            <Label htmlFor='weight'>Weight (kg)</Label>
            <Input
              id='weight'
              name='weight'
              defaultValue={pokemon?.weight || ''}
              type='number'
              step='0.1'
            />
            {state?.errors?.weight && (
              <p className='text-red-500 text-sm'>
                {state.errors.weight.join(', ')}
              </p>
            )}
          </div>

          <div className='space-y-2 col-span-1'>
            <Label htmlFor='maleGenderRatio'>♂ Gender ratio (%)</Label>
            <Input
              id='maleGenderRatio'
              name='maleGenderRatio'
              defaultValue={pokemon?.maleGenderRatio || ''}
              type='number'
              min='0'
              max='100'
            />
            {state?.errors?.maleGenderRatio && (
              <p className='text-red-500 text-sm'>
                {state.errors.maleGenderRatio.join(', ')}
              </p>
            )}
          </div>
          <div className='space-y-2 col-span-1'>
            <Label htmlFor='femaleGenderRatio'>♀ Gender ratio (%)</Label>
            <Input
              id='femaleGenderRatio'
              name='femaleGenderRatio'
              defaultValue={pokemon?.femaleGenderRatio || ''}
              type='number'
              min='0'
              max='100'
            />
            {state?.errors?.femaleGenderRatio && (
              <p className='text-red-500 text-sm'>
                {state.errors.femaleGenderRatio.join(', ')}
              </p>
            )}
          </div>

          <div className='space-y-2 col-span-2'>
            <Label htmlFor='abilities'>Abilities (comma-separated)</Label>
            <Input
              id='abilities'
              name='abilities'
              defaultValue={pokemon?.abilities?.join(', ') || ''}
              placeholder='e.g., Overgrow, Chlorophyll'
            />
            {state?.errors?.abilities && (
              <p className='text-red-500 text-sm'>
                {state.errors.abilities.join(', ')}
              </p>
            )}
          </div>

          <div className='space-y-2 col-span-2'>
            <Label htmlFor='eggGroups'>Egg Groups (comma-separated)</Label>
            <Input
              id='eggGroups'
              name='eggGroups'
              defaultValue={pokemon?.eggGroups?.join(', ') || ''}
              placeholder='e.g., Monster, Dragon'
            />
            {state?.errors?.eggGroups && (
              <p className='text-red-500 text-sm'>
                {state.errors.eggGroups.join(', ')}
              </p>
            )}
          </div>

          <div className='space-y-2 col-span-2'>
            <Label htmlFor='evolutionDescription'>Evolution Description</Label>
            <Textarea
              id='evolutionDescription'
              name='evolutionDescription'
              defaultValue={pokemon?.evolutionDescription || ''}
              rows={3}
            />
            {state?.errors?.evolutionDescription && (
              <p className='text-red-500 text-sm'>
                {state.errors.evolutionDescription.join(', ')}
              </p>
            )}
          </div>

          <div className='space-y-2 col-span-2'>
            <Label htmlFor='evolutionPhotoUrl'>Evolution Photo URL</Label>
            <Input
              id='evolutionPhotoUrl'
              name='evolutionPhotoUrl'
              defaultValue={pokemon?.evolutionPhotoUrl || ''}
              type='url'
              placeholder='https://example.com/evolution.png'
            />
            {state?.errors?.evolutionPhotoUrl && (
              <p className='text-red-500 text-sm'>
                {state.errors.evolutionPhotoUrl.join(', ')}
              </p>
            )}
          </div>

          {state?.message && (
            <p className='text-red-500 text-sm col-span-2' aria-live='polite'>
              {state.message}
            </p>
          )}

          <div className='col-span-2 flex justify-end gap-2 mt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={handleCancel}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isPending}>
              {isPending
                ? 'Saving...'
                : formType === 'create'
                ? 'Create Pokemon'
                : 'Update Pokemon'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

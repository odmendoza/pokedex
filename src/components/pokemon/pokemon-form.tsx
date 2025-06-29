'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextIcon, TicketsIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useLoading } from '@/lib/store/loading';
import { Pokemon } from '@/lib/definitions/pokemon';
import { pokemonSchema } from '@/lib/schemas/pokemon.schema';
import { toast } from 'sonner';
import { createPokemon, updatePokemon } from '@/lib/actions/pokemon';
import { useRef, useState } from 'react';
import type { PutBlobResult } from '@vercel/blob';
import Image from 'next/image';

interface PokemonFormProps {
  pokemon?: Pokemon;
  formType?: 'create' | 'edit';
}

export default function PokemonForm({ pokemon, formType }: PokemonFormProps) {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    formType === 'edit' && pokemon?.pokemonPhotoUrl
      ? pokemon.pokemonPhotoUrl
      : null
  );
  const { loading, setLoading } = useLoading();
  const router = useRouter();

  const [typeInput, setTypeInput] = useState((pokemon?.type || []).join(', '));
  const [abilitiesInput, setAbilitiesInput] = useState(
    (pokemon?.abilities || []).join(', ')
  );
  const [eggGroupsInput, setEggGroupsInput] = useState(
    (pokemon?.eggGroups || []).join(', ')
  );

  const form = useForm<z.infer<typeof pokemonSchema>>({
    resolver: zodResolver(pokemonSchema),
    defaultValues: {
      name: pokemon?.name || undefined,
      number: pokemon?.number || undefined,
      pokemonPhotoUrl: pokemon?.pokemonPhotoUrl || undefined,
      type: pokemon?.type || [],
      description: pokemon?.description || undefined,
      height: pokemon?.height || undefined,
      weight: pokemon?.weight || undefined,
      maleGenderRatio: pokemon?.maleGenderRatio || undefined,
      femaleGenderRatio: pokemon?.femaleGenderRatio || undefined,
      abilities: pokemon?.abilities || [],
      eggGroups: pokemon?.eggGroups || [],
      evolutionDescription: pokemon?.evolutionDescription || undefined,
      evolutionPhotoUrl: pokemon?.evolutionPhotoUrl || undefined,
      evolvesToNumber: pokemon?.evolvesToNumber || undefined,
    },
  });

  const handleCancel = () => {
    router.push('/pokemon');
  };

  const handleUpload = async () => {
    if (!inputFileRef.current?.files) {
      throw new Error('No file selected');
    }

    const file = inputFileRef.current.files[0];

    const response = await fetch(`/api/pokemon/upload?filename=${file.name}`, {
      method: 'POST',
      body: file,
    });

    const newBlob = (await response.json()) as PutBlobResult;

    return newBlob;
  };

  async function onSubmit(data: z.infer<typeof pokemonSchema>) {
    setLoading(true);
    try {
      if (
        inputFileRef.current?.files &&
        inputFileRef.current.files.length > 0
      ) {
        const uploadedBlob = await handleUpload();
        data.pokemonPhotoUrl = uploadedBlob?.url || data.pokemonPhotoUrl;
      }

      if (formType === 'edit' && pokemon) {
        const response = await updatePokemon(pokemon.number, data as Pokemon);
        if (response.message && response.icon) {
          if (response.icon === 'success') {
            toast.success(response.message);
            router.push(`/pokemon/${response.data?.number}`);
          }
          if (response.icon === 'error') {
            toast.error(response.message);
          }
        }
      } else {
        const response = await createPokemon(data as Pokemon);
        if (response.message && response.icon) {
          if (response.icon === 'success') {
            toast.success(response.message);
            router.push(`/pokemon/${response.data?.number}`);
          }
          if (response.icon === 'error') {
            toast.error(response.message);
          }
        }
      }
    } catch (error) {
      toast.error('Error on saving Pokémon. Please try again.');
      console.error('Error on saving Pokémon:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={'w-full md:w-2/3 lg:3/4 flex flex-col mx-auto p-8 md:p-4'}
      >
        <h1 className='text-2xl font-semibold py-4 pokemon-text-primary'>
          {formType === 'create'
            ? 'Nuevo pokémon'
            : pokemon?.name || 'Editar pokémon'}
        </h1>

        <div className='rounded-md bg-gray-50 p-4 md:p-6'>
          <div className='flex flex-col md:flex-row gap-4 mb-4'>
            {/* name */}

            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className={'w-full'}>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <div className={'relative'}>
                      <Input
                        className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                        placeholder='Pikachu'
                        {...field}
                      />
                      <TicketsIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* number */}

            <FormField
              control={form.control}
              name='number'
              render={({ field }) => (
                <FormItem className={'w-full'}>
                  <FormLabel>Número</FormLabel>
                  <FormControl>
                    <div className={'relative'}>
                      <Input
                        className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                        placeholder='25'
                        {...field}
                      />
                      <TicketsIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* pokemonPhotoUrl */}

          <FormField
            control={form.control}
            name='pokemonPhotoUrl'
            render={({}) => (
              <FormItem className={'w-full mb-2'}>
                <FormLabel>Foto del Pokémon</FormLabel>
                <FormControl>
                  <div className={'relative'}>
                    <Input
                      className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                      ref={inputFileRef}
                      type='file'
                      accept='image/jpeg, image/png, image/webp'
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setPreviewUrl(URL.createObjectURL(file));
                        } else {
                          setPreviewUrl(null);
                        }
                      }}
                    />
                    <TicketsIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {previewUrl && (
            <Image
              width={128}
              height={128}
              src={previewUrl}
              alt='Miniatura'
              className='mb-4 w-32 h-32 object-contain rounded border'
            />
          )}

          {/* type */}

          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem className={'w-full mb-4'}>
                <FormLabel>Tipo</FormLabel>
                <FormControl>
                  <div className={'relative'}>
                    <Input
                      className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                      placeholder='Eléctrico, venenoso'
                      value={typeInput}
                      onChange={(e) => setTypeInput(e.target.value)}
                      onBlur={() => {
                        field.onChange(
                          typeInput
                            .split(',')
                            .map((s) => s.trim())
                            .filter(Boolean)
                        );
                      }}
                    />
                    <TicketsIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* description */}

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem className={'mb-4'}>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <div className={'relative'}>
                    <Textarea
                      className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                      placeholder='Cuando se enfada, este Pokémon descarga la energía que almacena en el interior de las bolsas de las mejillas.'
                      {...field}
                    />
                    <TextIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='flex flex-col md:flex-row gap-4 mb-6'>
            {/* height */}

            <FormField
              control={form.control}
              name='height'
              render={({ field }) => (
                <FormItem className={'w-full mb-4'}>
                  <FormLabel>Altura (m)</FormLabel>
                  <FormControl>
                    <div className={'relative'}>
                      <Input
                        className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                        placeholder='004'
                        type='number'
                        step='0.01'
                        {...field}
                      />
                      <TicketsIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* weight */}

            <FormField
              control={form.control}
              name='weight'
              render={({ field }) => (
                <FormItem className={'w-full mb-4'}>
                  <FormLabel>Peso (kg)</FormLabel>
                  <FormControl>
                    <div className={'relative'}>
                      <Input
                        className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                        placeholder='6.0'
                        type='number'
                        step='0.01'
                        {...field}
                      />
                      <TicketsIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex flex-col md:flex-row gap-4 mb-6'>
            {/* maleGenderRatio */}

            <FormField
              control={form.control}
              name='maleGenderRatio'
              render={({ field }) => (
                <FormItem className={'w-full mb-4'}>
                  <FormLabel>Radio de género masculino (%)</FormLabel>
                  <FormControl>
                    <div className={'relative'}>
                      <Input
                        className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                        placeholder='50'
                        type='number'
                        step='0.01'
                        {...field}
                      />
                      <TicketsIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* femaleGenderRatio */}

            <FormField
              control={form.control}
              name='femaleGenderRatio'
              render={({ field }) => (
                <FormItem className={'w-full mb-4'}>
                  <FormLabel>Radio de género femenino (%)</FormLabel>
                  <FormControl>
                    <div className={'relative'}>
                      <Input
                        className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                        placeholder='50'
                        type='number'
                        step='0.01'
                        {...field}
                      />
                      <TicketsIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* abilities */}

          <FormField
            control={form.control}
            name='abilities'
            render={({ field }) => (
              <FormItem className={'w-full mb-4'}>
                <FormLabel>Habilidades</FormLabel>
                <FormControl>
                  <div className={'relative'}>
                    <Input
                      className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                      placeholder='Electricidad estática, pararrayos'
                      type='text'
                      value={abilitiesInput}
                      onChange={(e) => setAbilitiesInput(e.target.value)}
                      onBlur={() => {
                        field.onChange(
                          abilitiesInput
                            .split(',')
                            .map((s) => s.trim())
                            .filter(Boolean)
                        );
                      }}
                    />
                    <TicketsIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* eggGroups */}

          <FormField
            control={form.control}
            name='eggGroups'
            render={({ field }) => (
              <FormItem className={'w-full mb-4'}>
                <FormLabel>Grupos de huevos</FormLabel>
                <FormControl>
                  <div className={'relative'}>
                    <Input
                      className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                      placeholder='Hada, Campo'
                      value={eggGroupsInput}
                      onChange={(e) => setEggGroupsInput(e.target.value)}
                      onBlur={() => {
                        field.onChange(
                          eggGroupsInput
                            .split(',')
                            .map((s) => s.trim())
                            .filter(Boolean)
                        );
                      }}
                    />
                    <TicketsIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* evolutionDescription */}

          <FormField
            control={form.control}
            name='evolutionDescription'
            render={({ field }) => (
              <FormItem className={'mb-4'}>
                <FormLabel>Descripción de la evolución</FormLabel>
                <FormControl>
                  <div className={'relative'}>
                    <Textarea
                      className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                      placeholder='Pikachu evoluciona a Raichu al exponerlo a una Piedra Trueno.'
                      {...field}
                    />
                    <TextIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* evolutionPhotoUrl */}

          <FormField
            control={form.control}
            name='evolvesToNumber'
            render={({ field }) => (
              <FormItem className={'w-full mb-4'}>
                <FormLabel>Número de evolución</FormLabel>
                <FormControl>
                  <div className={'relative'}>
                    <Input
                      className='peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500'
                      placeholder='Ejemplo: 2'
                      type='text'
                      {...field}
                    />
                    <TicketsIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='mt-6 flex justify-end gap-4'>
          <Button
            variant={'secondary'}
            type={'button'}
            role={'button'}
            onClick={handleCancel}
          >
            Cancelar
          </Button>

          <Button type='submit' variant={'default'} disabled={loading}>
            {loading ? 'Guardando ...' : 'Guardar'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

import PokemonForm from '@/components/pokemon/pokemon-form';
import { getPokemonById } from '@/lib/actions/pokemon';
import { notFound } from 'next/navigation';

export default async function EditPokemonPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pokemon = await getPokemonById(id);

  if (!pokemon) {
    notFound();
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <PokemonForm pokemon={pokemon} formType='edit' />
    </div>
  );
}

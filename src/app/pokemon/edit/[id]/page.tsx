import PokemonForm from '@/components/pokemon/pokemon-form';
import { getPokemonById } from '@/lib/actions/pokemon';
import { notFound } from 'next/navigation';

interface EditPokemonPageProps {
  params: { id: string };
}

export default async function EditPokemonPage({
  params,
}: EditPokemonPageProps) {
  const pokemon = await getPokemonById(params.id);

  if (!pokemon) {
    notFound();
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <PokemonForm pokemon={pokemon} formType='edit' />
    </div>
  );
}

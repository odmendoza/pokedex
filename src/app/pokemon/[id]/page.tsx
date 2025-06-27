import { notFound } from 'next/navigation';
import PokemonDetail from '@/components/pokemon/pokemon-detail';
import { getPokemonById } from '@/lib/actions/pokemon';

interface PokemonPageProps {
  params: { id: string };
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const pokemon = await getPokemonById(params.id);

  if (!pokemon) {
    notFound();
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <PokemonDetail pokemon={pokemon} />
    </div>
  );
}

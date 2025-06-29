import { notFound } from 'next/navigation';
import PokemonDetail from '@/components/pokemon/pokemon-detail';
import { getPokemonById } from '@/lib/actions/pokemon';

export default async function PokemonPage({
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
      <PokemonDetail pokemon={pokemon} />
    </div>
  );
}

import { notFound } from 'next/navigation';
import PokemonDetail from '@/components/pokemon-detail';

interface PokemonPageProps {
  params: { id: string };
}

async function getPokemon(id: string) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function PokemonPage({ params }: PokemonPageProps) {
  const pokemon = await getPokemon(params.id);

  if (!pokemon) {
    notFound();
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <PokemonDetail pokemon={pokemon} />
    </div>
  );
}

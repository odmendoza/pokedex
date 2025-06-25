import PokemonForm from '@/components/pokemon/pokemon-form';
import { notFound } from 'next/navigation';

interface EditPokemonPageProps {
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

export default async function EditPokemonPage({
  params,
}: EditPokemonPageProps) {
  const pokemon = await getPokemon(params.id);

  if (!pokemon) {
    notFound();
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-4xl font-bold text-gray-900 mb-8'>
          Editar Pokémon
        </h1>
        <PokemonForm />
      </div>
    </div>
  );
}

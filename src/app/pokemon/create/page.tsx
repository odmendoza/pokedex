import PokemonForm from '@/components/pokemon/pokemon-form';

export default function CreatePokemonPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-4xl font-bold text-gray-900 mb-8'>
          Crear Nuevo Pokémon
        </h1>
        <PokemonForm />
      </div>
    </div>
  );
}

import PokemonForm from '@/components/pokemon/pokemon-form';

export default function CreatePokemonPage() {
  return (
    <div className='container mx-auto'>
        <PokemonForm formType='create' />
    </div>
  );
}

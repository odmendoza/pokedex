export interface Pokemon {
  id?: string
  createdAt: Date
  updatedAt: Date
  name: string
  number: string
  pokemonPhotoUrl?: string | null
  type: string[]
  description?: string | null
  height?: number | null
  weight?: number | null
  maleGenderRatio?: number | null
  femaleGenderRatio?: number | null
  abilities: string[]
  eggGroups: string[]
  evolutionDescription?: string | null
  evolutionPhotoUrl?: string | null
  evolvesToNumber?: string | null
}
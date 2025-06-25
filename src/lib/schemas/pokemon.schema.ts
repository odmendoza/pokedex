import { z } from 'zod'

export const pokemonSchema = z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    number: z.string().min(1, { message: 'Number is required.' }),
    pokemonPhotoUrl: z.string().url('Invalid URL for Pokemon photo').optional().or(z.literal('')),
    type: z.array(z.string()).min(1, { message: 'At least one type is required.' }),
    description: z.string().optional().or(z.literal('')),
    height: z.coerce
        .number()
        .min(0, { message: 'Height must be a positive number.' })
        .optional()
        .or(z.literal(Number.NaN)),
    weight: z.coerce
        .number()
        .min(0, { message: 'Weight must be a positive number.' })
        .optional()
        .or(z.literal(Number.NaN)),
    maleGenderRatio: z.coerce.number().min(0).max(100).optional().or(z.literal(Number.NaN)),
    femaleGenderRatio: z.coerce.number().min(0).max(100).optional().or(z.literal(Number.NaN)),
    abilities: z.array(z.string()).optional(),
    eggGroups: z.array(z.string()).optional(),
    evolutionDescription: z.string().optional().or(z.literal('')),
    evolutionPhotoUrl: z.string().url('Invalid URL for Evolution photo').optional().or(z.literal('')),
})

export const updatePokemonSchema = pokemonSchema.partial()

'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { pokemonSchema, updatePokemonSchema } from '@/lib/schemas/pokemon.schema'
import { Pokemon } from '../definitions/pokemon'
import { log } from 'console'

type FormState = {
    errors?: {
        name?: string[]
        number?: string[]
        pokemonPhotoUrl?: string[]
        type?: string[]
        description?: string[]
        height?: string[]
        weight?: string[]
        maleGenderRatio?: string[]
        femaleGenderRatio?: string[]
        abilities?: string[]
        eggGroups?: string[]
        evolutionDescription?: string[]
        evolutionPhotoUrl?: string[]
        _form?: string[]
    }
    message?: string | null
}

export async function createPokemon(data: Pokemon): Promise<{
    message: string
    icon: string
    data?: Pokemon
    errors?: { [key: string]: string[] }
}> {

    try {  
        const response = await fetch('http://localhost:3000/api/pokemon', {
            method: 'POST',
            body: JSON.stringify(data),
        });

        console.log('Response from API:', response);

        if (response.ok) {
            return {
            icon: 'success',
            message: 'Pokemon created successfully.',
            data: await response.json() as Pokemon,
            }
        } else {
            return {
                icon: 'error',
                message: response.statusText || 'Failed to create Pokemon.',
            }
        }   
        
    } catch (error) {
        console.error('Database Error:', error)
        return {
            icon: 'error',
            message: 'Database Error: Failed to Create Pokemon.',
        }
    }
}

export async function updatePokemon(id: string, prevState: FormState, formData: FormData): Promise<FormState> {
    const rawFormData = Object.fromEntries(formData.entries()) as { [k: string]: FormDataEntryValue }

    // Handle array fields (type, abilities, eggGroups)
    const type = formData.getAll('type').filter(Boolean) as string[]
    const abilities = formData.getAll('abilities').filter(Boolean) as string[]
    const eggGroups = formData.getAll('eggGroups').filter(Boolean) as string[]

    const dataToValidate = {
        ...rawFormData,
        type,
        abilities,
        eggGroups,
        height: rawFormData.height === '' ? undefined : rawFormData.height,
        weight: rawFormData.weight === '' ? undefined : rawFormData.weight,
        maleGenderRatio: rawFormData.maleGenderRatio === '' ? undefined : rawFormData.maleGenderRatio,
        femaleGenderRatio: rawFormData.femaleGenderRatio === '' ? undefined : rawFormData.femaleGenderRatio,
    }

    const validatedFields = updatePokemonSchema.safeParse(dataToValidate)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Pokemon.',
        }
    }

    try {
        await prisma.pokemon.update({
            where: { id },
            data: validatedFields.data,
        })
    } catch (error) {
        console.error('Database Error:', error)
        return {
            message: 'Database Error: Failed to Update Pokemon.',
        }
    }

    revalidatePath('/pokemon')
    revalidatePath(`/pokemon/edit/${id}`)
    redirect('/pokemon')
}

export async function deletePokemon(id: string): Promise<FormState> {
    try {
        await prisma.pokemon.delete({
            where: { id },
        })
        revalidatePath('/pokemon')
        return { message: 'Pokemon deleted successfully.' }
    } catch (error) {
        console.error('Database Error:', error)
        return { message: 'Database Error: Failed to Delete Pokemon.' }
    }
}

'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import prisma from '@/lib/prisma'
import { pokemonSchema, updatePokemonSchema } from '@/lib/schemas/pokemon.schema'

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

export async function createPokemon(prevState: FormState, formData: FormData): Promise<FormState> {
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

    const validatedFields = pokemonSchema.safeParse(dataToValidate)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Pokemon.',
        }
    }

    try {
        await prisma.pokemon.create({
            data: {
                ...validatedFields.data,
                type: validatedFields.data.type || [],
                abilities: validatedFields.data.abilities || [],
                eggGroups: validatedFields.data.eggGroups || [],
            },
        })
    } catch (error) {
        console.error('Database Error:', error)
        return {
            message: 'Database Error: Failed to Create Pokemon.',
        }
    }

    revalidatePath('/pokemon')
    redirect('/pokemon')
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

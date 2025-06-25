import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { pokemonSchema } from '@/lib/schemas/pokemon.schema'

// GET: Find all Pokemon
export async function GET() {
    try {
        const pokemon = await prisma.pokemon.findMany()
        return NextResponse.json(pokemon, { status: 200 })
    } catch (error) {
        console.error('Error fetching Pokemon:', error)
        return NextResponse.json({ message: 'Failed to fetch Pokemon' }, { status: 500 })
    }
}

// POST: Create a new Pokemon
export async function POST(req: Request) {
    try {
        const body = await req.json()
        const validatedData = pokemonSchema.safeParse(body)

        if (!validatedData.success) {
            return NextResponse.json({ errors: validatedData.error.flatten().fieldErrors }, { status: 400 })
        }

        const newPokemon = await prisma.pokemon.create({
            data: {
                ...validatedData.data,
                // Ensure arrays are not undefined if optional
                type: validatedData.data.type || [],
                abilities: validatedData.data.abilities || [],
                eggGroups: validatedData.data.eggGroups || [],
            },
        })
        return NextResponse.json(newPokemon, { status: 201 })
    } catch (error) {
        console.error('Error creating Pokemon:', error)
        return NextResponse.json({ message: 'Failed to create Pokemon' }, { status: 500 })
    }
}

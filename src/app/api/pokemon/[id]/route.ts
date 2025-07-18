import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'
import { updatePokemonSchema } from '@/lib/schemas/pokemon.schema'

// GET: Find one Pokemon by ID
export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();

        const pokemon = await prisma.pokemon.findUnique({
            where: { number: id },
        })

        if (!pokemon) {
            return NextResponse.json({ message: 'Pokemon not found' }, { status: 404 })
        }
        return NextResponse.json(pokemon, { status: 200 })
    } catch (error) {
        console.error('Error fetching Pokemon:', error)
        return NextResponse.json({ message: 'Failed to fetch Pokemon' }, { status: 500 })
    }
}

// PUT: Update a Pokemon by ID
export async function PUT(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();
        const body = await request.json();
        const validatedData = updatePokemonSchema.safeParse(body);

        if (!validatedData.success) {
            return NextResponse.json({ errors: validatedData.error.flatten().fieldErrors }, { status: 400 })
        }

        if (validatedData.data.evolvesToNumber) {
            const evolvesToPokemon = await prisma.pokemon.findUnique({
                where: { number: validatedData.data.evolvesToNumber },
                select: { pokemonPhotoUrl: true },
            })

            if (evolvesToPokemon) {
                validatedData.data.evolutionPhotoUrl = evolvesToPokemon.pokemonPhotoUrl ?? undefined
            }
        }

        const updatedPokemon = await prisma.pokemon.update({
            where: { number: id },
            data: validatedData.data,
        })
        return NextResponse.json(updatedPokemon, { status: 200 })
    } catch (error) {
        console.error('Error updating Pokemon:', error)
        return NextResponse.json({ message: 'Failed to update Pokemon' }, { status: 500 })
    }
}

// DELETE: Delete a Pokemon by ID
export async function DELETE(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();

        await prisma.pokemon.delete({
            where: { number: id },
        })
        return new NextResponse(null, { status: 204 })
    } catch (error) {
        console.error('Error deleting Pokemon:', error)
        return NextResponse.json({ message: 'Failed to delete Pokemon' }, { status: 500 })
    }
}

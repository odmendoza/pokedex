import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { updatePokemonSchema } from '@/lib/schemas/pokemon.schema'

// GET: Find one Pokemon by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params
        const pokemon = await prisma.pokemon.findUnique({
            where: { number : id },
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
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params
        const body = await req.json()
        const validatedData = updatePokemonSchema.safeParse(body)

        if (!validatedData.success) {
            return NextResponse.json({ errors: validatedData.error.flatten().fieldErrors }, { status: 400 })
        }

        const updatedPokemon = await prisma.pokemon.update({
            where: { number : id },
            data: validatedData.data,
        })
        return NextResponse.json(updatedPokemon, { status: 200 })
    } catch (error) {
        console.error('Error updating Pokemon:', error)
        return NextResponse.json({ message: 'Failed to update Pokemon' }, { status: 500 })
    }
}

// DELETE: Delete a Pokemon by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params
        await prisma.pokemon.delete({
            where: { number : id },
        })
        return new NextResponse(null, { status: 204 })
    } catch (error) {
        console.error('Error deleting Pokemon:', error)
        return NextResponse.json({ message: 'Failed to delete Pokemon' }, { status: 500 })
    }
}

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const count = await prisma.pokemon.count();
        const skip = Math.floor(Math.random() * count);
        const randomPokemon = await prisma.pokemon.findFirst({
            skip,
        });
        if (!randomPokemon) {
            return NextResponse.json({ message: 'No Pokémon found' }, { status: 404 });
        }
        return NextResponse.json(randomPokemon, { status: 200 });
    } catch (error) {
        console.error('Error fetching random Pokémon:', error);
        return NextResponse.json({ message: 'Failed to fetch random Pokémon' }, { status: 500 });
    }
}
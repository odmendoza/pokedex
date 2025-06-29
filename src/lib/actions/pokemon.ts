'use server'

import { Pokemon } from '../definitions/pokemon'

export async function createPokemon(data: Pokemon): Promise<{
    message: string
    icon: string
    data?: Pokemon
    errors?: { [key: string]: string[] }
}> {
    console.log('Creating Pokemon with data:', JSON.stringify(data))

    try {
        const response = await fetch('http://localhost:3000/api/pokemon', {
            method: 'POST',
            body: JSON.stringify(data),
        });

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

export async function getRandomPokemonFromAPI(): Promise<{
    message: string
    icon: string
    data?: Pokemon | null
    errors?: { [key: string]: string[] }
}> {
    try {
        const response = await fetch('http://localhost:3000/api/pokemon/random', {
            method: 'GET',
        });

        if (response.ok) {
            return {
                icon: 'success',
                message: 'Pokemon retrieved successfully.',
                data: await response.json() as Pokemon
            }
        } else {
            return {
                icon: 'error',
                message: response.statusText || 'Failed to retrieve Pokemon.',
            }
        }

    } catch (error) {
        console.error('Database Error:', error)
        return {
            icon: 'error',
            message: 'Database Error: Failed to retrieve Pokemon.',
        }
    }
}

export async function getPokemons(limit: number, offset: number): Promise<Pokemon[]> {
    try {
        const response = await fetch(
            `http://localhost:3000/api/pokemon?limit=${limit}&offset=${offset}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch Pokémon');
        }
        return await response.json() as Pokemon[];
    } catch (error) {
        console.error('Database Error:', error);
        return [];
    }
}

export async function getPokemonById(id: string): Promise<Pokemon | null> {
    try {
        const response = await fetch(`http://localhost:3000/api/pokemon/${id}`, {
            method: 'GET',
        });
        if (!response.ok) {
            throw new Error('Failed to fetch Pokémon');
        }
        return await response.json() as Pokemon;
    } catch (error) {
        console.error('Database Error:', error);
        return null;
    }
}

export async function updatePokemon(id: string, data: Pokemon): Promise<{
    message: string
    icon: string
    data?: Pokemon
    errors?: { [key: string]: string[] }
}> {

    console.log('Updating Pokemon with data:', JSON.stringify(data))

    try {
        const response = await fetch(
            `http://localhost:3000/api/pokemon/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
        });

        if (response.ok) {
            return {
                icon: 'success',
                message: 'Pokemon updated successfully.',
                data: await response.json() as Pokemon,
            }
        } else {
            return {
                icon: 'error',
                message: response.statusText || 'Failed to update Pokemon.',
            }
        }

    } catch (error) {
        console.error('Database Error:', error)
        return {
            icon: 'error',
            message: 'Database Error: Failed to update Pokemon.',
        }
    }
}

export async function deletePokemon(id: string): Promise<{
    message: string
    icon: string
    errors?: { [key: string]: string[] }
}> {
    try {
        const response = await fetch(`http://localhost:3000/api/pokemon/${id}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            return {
                icon: 'success',
                message: 'Pokemon deleted successfully.',
            }
        } else {
            return {
                icon: 'error',
                message: response.statusText || 'Failed to delete Pokemon.',
            }
        }
    } catch (error) {
        console.error('Database Error:', error)
        return {
            icon: 'error',
            message: 'Database Error: Failed to delete Pokemon.',
        }
    }
}

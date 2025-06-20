"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Edit } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface PokemonDetailProps {
  pokemon: {
    id: number
    name: string
    height: number
    weight: number
    sprites: {
      front_default: string
      back_default: string
    }
    types: Array<{
      type: {
        name: string
      }
    }>
    stats: Array<{
      base_stat: number
      stat: {
        name: string
      }
    }>
    abilities: Array<{
      ability: {
        name: string
      }
    }>
  }
}

export default function PokemonDetail({ pokemon }: PokemonDetailProps) {
  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href="/pokemon">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Button>
        </Link>
        <Link href={`/pokemon/edit/${pokemon.id}`}>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Editar
          </Button>
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl capitalize text-center">{pokemon.name}</CardTitle>
            <p className="text-center text-gray-500">#{pokemon.id}</p>
          </CardHeader>
          <CardContent className="text-center">
            <div className="flex justify-center gap-4 mb-6">
              <Image
                src={pokemon.sprites.front_default || "/placeholder.svg"}
                alt={`${pokemon.name} front`}
                width={150}
                height={150}
              />
              <Image
                src={pokemon.sprites.back_default || "/placeholder.svg"}
                alt={`${pokemon.name} back`}
                width={150}
                height={150}
              />
            </div>

            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {pokemon.types.map((type) => (
                <Badge key={type.type.name} variant="secondary" className="text-lg px-4 py-2">
                  {type.type.name}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{pokemon.height / 10} m</p>
                <p className="text-gray-500">Altura</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{pokemon.weight / 10} kg</p>
                <p className="text-gray-500">Peso</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name}>
                  <div className="flex justify-between mb-2">
                    <span className="capitalize">{stat.stat.name.replace("-", " ")}</span>
                    <span className="font-bold">{stat.base_stat}</span>
                  </div>
                  <Progress value={(stat.base_stat / 255) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Habilidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <Badge key={ability.ability.name} variant="outline" className="capitalize">
                    {ability.ability.name.replace("-", " ")}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

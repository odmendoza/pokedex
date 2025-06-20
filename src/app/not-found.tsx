import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function NotFound() {
  return (
    <div className='flex items-start md:items-center justify-center min-h-screen p-8'>
      <Card className='w-full mx-4 md:mx-0 md:w-1/3 pokemon-bg-blue/10 backdrop-blur supports-[backdrop-filter]:bg-white/10 sticky top-0 z-40'>
        <CardHeader>
          <CardDescription>404</CardDescription>
          <CardTitle>Página no encontrada</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No hemos podido encontrar lo que estás buscando</p>
        </CardContent>
      </Card>
    </div>
  );
}

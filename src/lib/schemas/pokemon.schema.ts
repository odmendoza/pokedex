import { z } from 'zod';

const pokemonSchema = z.object({
    nombre: z.coerce.string({
        required_error: 'El nombre es requerido'
    }),
    email: z.coerce.string({
        required_error: 'El email es requerido'
    }).email({
        message: 'El correo no es válido'
    }),
    telefono: z.coerce.string({
        required_error: 'El teléfono es requerido'
    }).min(10, {
        message: 'El teléfono debe tener al menos 10 caracteres'
    }).max(10, {
        message: 'El teléfono debe tener máximo 10 caracteres'
    }).regex(/^\d+$/, {
        message: 'El teléfono debe contener solo números'
    }),
    mensaje: z.coerce.string({
        required_error: 'El mensaje es requerido'
    }).min(10, {
        message: 'El mensaje debe tener al menos 10 caracteres'
    }).max(500, {
        message: 'El mensaje debe tener máximo 500 caracteres'
    } )
});
export default pokemonSchema;
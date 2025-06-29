# Pokedex App

Una aplicación web de Pokédex desarrollada con **Next.js**, **TypeScript** y **Prisma** que permite explorar, crear, editar y eliminar Pokémon, así como ver detalles y evoluciones. El proyecto está desplegado en **Vercel** y utiliza **PostgreSQL** como base de datos.

---

## 🚀 Funcionalidades principales

- **Listado de Pokémon:**  
  Visualiza una lista paginada de Pokémon con búsqueda por nombre.

- **Detalle de Pokémon:**  
  Consulta información detallada de cada Pokémon, incluyendo imagen, tipos, habilidades, descripción y evolución (con navegación entre evoluciones).

- **Crear Pokémon:**  
  Formulario para agregar un nuevo Pokémon, subir su imagen y definir sus características.

- **Editar Pokémon:**  
  Modifica los datos de un Pokémon existente.

- **Eliminar Pokémon:**  
  Elimina un Pokémon con confirmación mediante diálogo.

- **Pokémon aleatorio:**  
  Visualiza un Pokémon aleatorio en la pantalla principal.

---

## 🖼️ Vistas principales

- **Inicio:**  
  Muestra un Pokémon aleatorio y acceso rápido a la lista.

- **Lista de Pokémon:**  
  Tabla/lista paginada con buscador.

- **Detalle de Pokémon:**  
  Información completa, imagen, tipos, habilidades, evolución (con flecha visual).

- **Formulario de creación/edición:**  
  Inputs para todos los campos relevantes, subida de imagen con preview.

---

## 🛠️ Stack y librerías

- **Frontend:**  
  - [Next.js](https://nextjs.org/) (App Router, SSR/SSG)
  - [React](https://react.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/) (estilos utilitarios)
  - [shadcn/ui](https://ui.shadcn.com/) (componentes UI)
  - [Lucide Icons](https://lucide.dev/) (iconos)
  - [Next/Image](https://nextjs.org/docs/pages/api-reference/components/image) (optimización de imágenes)

- **Backend y base de datos:**  
  - [Prisma ORM](https://www.prisma.io/)  
  - [PostgreSQL](https://www.postgresql.org/)

- **Almacenamiento de imágenes:**  
  - [Vercel Blob Storage](https://vercel.com/docs/storage/vercel-blob) (subida y entrega de imágenes públicas)

- **Despliegue:**  
  - [Vercel](https://vercel.com/)

---

## ⚙️ Desarrollo local

1. **Clona el repositorio:**
   ```sh
   git clone https://github.com/tu-usuario/pokedex.git
   cd pokedex
   ```

2. **Instala dependencias:**
   ```sh
   pnpm install
   ```

3. **Configura las variables de entorno:**
   - Crea un archivo `.env` y define:
     ```
     DATABASE_URL=postgresql://usuario:password@host:puerto/db
     API_URL=http://localhost:3000
     BLOB_READ_WRITE_TOKEN=vercel_blob_rw_XD
     VERCEL_OIDC_TOKEN=exJhbGciOiJSUzXDwrbtmrr
     ```

4. **Ejecuta migraciones y genera Prisma Client:**
   ```sh
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Inicia la app:**
   ```sh
   pnpm dev
   ```

---

## 🗄️ Estructura de la base de datos

- Modelo principal: `Pokemon`
  - Campos: nombre, número, imagen, tipos, habilidades, descripción, altura, peso, género, grupos huevo, descripción de evolución, imagen de evolución, número de evolución, etc.

---

## ☁️ Despliegue

- El proyecto está desplegado en **Vercel**.
- La base de datos PostgreSQL puede estar en [Neon](https://neon.tech/), [Supabase](https://supabase.com/), [Railway](https://railway.app/) o cualquier proveedor compatible.
- Las imágenes se almacenan en **Vercel Blob Storage** y se sirven públicamente.

---

## 📚 Recursos y librerías adicionales

- [React Hook Form](https://react-hook-form.com/) (manejo de formularios)
- [Zod](https://zod.dev/) (validación de esquemas)
- [Toast](https://ui.shadcn.com/docs/components/toast) (notificaciones)
- [NextAuth](https://next-auth.js.org/) (opcional, para autenticación) PRÓXIMANENTE !!!

---

## ✨ Créditos

- Inspirado en la Pokédex original de Pokémon.
- Imágenes y datos de Pokémon son propiedad de The Pokémon Company.

---

¡Disfruta explorando y gestionando tu Pokédex!  
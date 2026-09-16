# Carlos Sesme — Portfolio

Portafolio local con Next.js App Router, React y TypeScript.

## Ejecutar

```sh
pnpm install
pnpm dev
```

Abrir http://localhost:3000. Para producción: `pnpm build` y `pnpm start`.
Validación de tipos: `pnpm typecheck`.

## Contenido

- `src/data/es.json` y `src/data/en.json`: datos del portafolio anterior, conservados en ambos idiomas.
- `src/app/page.tsx`: composición de las secciones del portafolio.
- `src/components/`: secciones independientes y componentes compartidos de la interfaz.
- `src/hooks/`: lógica de preferencias persistentes de tema e idioma.
- `src/types/`: tipos compartidos de contenido y componentes.
- `src/constants/`: etiquetas, navegación, tecnologías, iconos y preferencias.
- `src/app/globals.css`: estilos adaptables y variables para ambos temas.
- `public/images` y `public/icons`: fotografías, capturas e iconos usados por la interfaz.
- `public/files/cv.pdf`: copia del CV original en la ruta indicada por los JSON.

El tema inicial sigue al sistema. Las opciones claro, oscuro y sistema y el idioma se guardan en localStorage. El modo sistema responde a cambios del dispositivo. El sitio inicia en español.

Los niveles de habilidades y la descripción profesional conservan los datos originales; conviene actualizarlos si han cambiado. El proyecto Aurora enlaza al sitio de la empresa porque el JSON no contiene demo ni repositorio público. El contacto abre el cliente de correo; no requiere backend. Las fuentes DM Sans y Manrope usan Google Fonts, con respaldo sans-serif.

## Formato

`pnpm format` aplica Prettier a los archivos del proyecto.
`pnpm format:check` verifica el formato sin modificar archivos.

Se conservan únicamente las imágenes e iconos usados por la interfaz. Las referencias de los JSON a recursos eliminados se dejaron vacías.

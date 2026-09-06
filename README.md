# Plan Chevrolet · Captación de leads

Webapp SEO-first para presentar planes de ahorro Chevrolet, captar consultas y gestionarlas desde un panel privado.

## Stack

- Next.js 16 + App Router + TypeScript
- Tailwind CSS 4
- MongoDB Node.js Driver
- Zod para validación de entradas
- JOSE + bcryptjs para sesión y contraseñas
- Node.js LTS y npm

## Requisitos

- Node.js LTS
- npm
- Una base MongoDB accesible desde el servidor de DigitalOcean

## Instalación local

```bash
npm install
Copy-Item .env.example .env
```

Para probar sin MongoDB, dejá `DEMO_MODE=true`: el formulario, el login y el panel funcionan con datos en memoria, que se pierden al reiniciar el servidor. Para el modo real, usá `DEMO_MODE=false` y completá `.env` con el connection string de MongoDB, un `AUTH_SECRET` aleatorio de al menos 32 caracteres y las credenciales del administrador inicial. El archivo `.env` está ignorado por Git.

```bash
npm run seed:admin
npm run dev
```

La landing queda disponible en `http://localhost:3000` y el panel en `http://localhost:3000/admin`.

## Comandos

```bash
npm run dev        # desarrollo
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run build      # build de producción
npm start          # servidor de producción
npm run seed:admin # crea o actualiza el admin indicado en .env
npm run test:run   # unitarios e integración con Vitest
```

## Testing

- Unitarios e integración: `npm.cmd run test:run` ejecuta Vitest sobre `tests/unit` y `tests/integration`.
- E2E: usar el MCP oficial de Playwright configurado en `.cursor/mcp.json` contra `http://localhost:3000` con `DEMO_MODE=true`.
- Los flujos documentados están en `tests/e2e/README.md`.
- Antes de cerrar cambios, ejecutar también `npm.cmd run lint`, `npm.cmd run typecheck` y `npm.cmd run build`.

## Repositorio y flujo GitHub

El proyecto está publicado en `git@github.com:marcelafortecarjunin-cyber/webapp-pda.git`, usando `main` como rama principal.

```bash
git clone git@github.com:marcelafortecarjunin-cyber/webapp-pda.git
cd webapp-pda
git switch dev
git pull --ff-only
git push origin dev
```

El trabajo diario se realiza sobre `dev`. La rama `main` se mantiene estable y se actualiza mediante una integración revisada. La autenticación se realiza por SSH. Si una máquina nueva no tiene acceso, agregá su clave pública Ed25519 en `Settings → SSH and GPG keys` de GitHub. Nunca compartas ni versionés la clave privada. Antes de hacer commit, revisá `git status` y confirmá que `.env`, tokens, connection strings y artefactos generados estén excluidos.

## Mantenimiento de documentación

- Cada nueva funcionalidad, cambio de flujo, comando, variable de entorno o decisión operativa debe reflejarse en este README dentro de la misma tarea.
- Mantené sincronizadas las secciones de instalación, funcionalidades, testing y despliegue con el comportamiento real del proyecto.
- Usá `AGENTS.md` para registrar aprendizajes durables y reglas de trabajo; el README debe describir el estado actual y el uso del producto.
- Nunca incluyas credenciales, connection strings, datos personales de leads ni otros secretos en la documentación.

## Variables de entorno

| Variable | Uso |
| --- | --- |
| `MONGODB_URI` | Connection string privado de MongoDB |
| `MONGODB_DB` | Nombre de la base, por defecto `chevrolet_leads` |
| `DEMO_MODE` | `true` para operar sin MongoDB; `false` para persistencia real |
| `AUTH_SECRET` | Clave para firmar sesiones |
| `ADMIN_EMAIL` | Email usado por el seed inicial |
| `ADMIN_PASSWORD` | Contraseña del seed inicial, mínimo 12 caracteres |
| `NEXT_PUBLIC_SITE_URL` | URL pública para metadata y SEO |

No pegues valores reales en este README, en `AGENTS.md`, en el código ni en logs.

## Funcionalidad

- Landing pública con catálogo de Sonic, Onix, Onix Plus, Tracker, S10, Montana y Captiva Híbrida.
- Formulario con nombre completo, email y plan de interés.
- Validación servidor con Zod, honeypot y límite básico por IP.
- Leads almacenados con estado `nuevo`, `contactado` o `cerrado`.
- Login de administradores con sesión firmada, cookie `httpOnly` y contraseña hasheada.
- Panel con búsqueda, filtro de estado y actualización de cada lead.

Los valores de cuota y las imágenes iniciales fueron relevados de la página oficial de Plan Chevrolet el 4 de septiembre de 2026. Son referencias y deben actualizarse cuando cambien las condiciones comerciales. Los recursos de marca deben utilizarse únicamente con autorización correspondiente.

## Despliegue en DigitalOcean

1. Crear la app Node.js en DigitalOcean y configurar las variables de entorno en el panel del servicio.
2. Usar el comando de build `npm run build`.
3. Usar el comando de ejecución `npm start`.
4. Restringir el acceso de MongoDB a la red/IP del servicio cuando la infraestructura lo permita.
5. Ejecutar `npm run seed:admin` una vez contra la base de producción usando un job seguro o consola privada.
6. Configurar dominio, HTTPS y `NEXT_PUBLIC_SITE_URL` con la URL final.

Antes de publicar, ejecutar lint, typecheck, build y una prueba completa de alta de lead y acceso admin.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

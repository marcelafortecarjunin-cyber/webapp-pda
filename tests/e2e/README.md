# Flujos E2E con Playwright MCP

Estos flujos se ejecutan contra la aplicación levantada en `http://localhost:3000` usando el servidor MCP oficial configurado en `.cursor/mcp.json`.

## Preparación

1. Confirmar `DEMO_MODE=true` en `.env`.
2. Levantar la app con `npm.cmd run dev`.
3. Abrir o reiniciar la conexión del servidor `playwright` en Cursor.

## Flujo público: captación de lead

- Abrir `/`.
- Verificar el título principal, el catálogo y los siete modelos.
- Hacer click en `Quiero este plan` en una tarjeta.
- Verificar que el formulario se enfoque/desplace y que el plan quede seleccionado.
- Completar nombre y email.
- Enviar el formulario.
- Verificar el mensaje `Listo. Un asesor va a contactarte muy pronto.`.

## Flujo admin: seguimiento del lead

- Abrir `/admin/login`.
- Ingresar con `ADMIN_EMAIL` y `ADMIN_PASSWORD` de `.env`.
- Verificar que `/admin` muestre el panel y el lead enviado.
- Filtrar por nombre, email o plan.
- Cambiar el estado del lead entre `nuevo`, `contactado` y `cerrado`.
- Verificar que el estado actualizado permanezca visible.
- Cerrar sesión y verificar el regreso a la landing.

## Criterio de aprobación

El flujo se considera aprobado únicamente si no hay errores de consola o red, los mensajes de éxito aparecen y las rutas protegidas redirigen al login sin sesión.

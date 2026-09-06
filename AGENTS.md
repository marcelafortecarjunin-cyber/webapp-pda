# Reglas del proyecto

## Flujo de trabajo

- Siempre planificá antes de meter código. Si el alcance cambia, actualizá primero el plan.
- Elegí el stack según el tipo de producto y el uso de la aplicación.
- Usá npm para el package management y preferí librerías conocidas, activamente mantenidas y proporcionales al problema.
- Consultá `context7` antes de implementar APIs o patrones dependientes de versiones.

## Mejora continua y conocimiento del proyecto

- Después de cada tarea relevante, revisá si surgió un aprendizaje, una decisión, un límite o un fallo que pueda repetirse.
- Si el conocimiento es durable y accionable, incorporalo en este archivo dentro de la misma tarea para mejorar futuros cambios.
- Antes de implementar, consultá estas reglas y aplicá los aprendizajes ya documentados.
- No registres ruido temporal, resultados de una ejecución aislada, credenciales, connection strings ni datos personales.

### Aprendizajes aplicables

- En Windows PowerShell, usá `npm.cmd` cuando la política de ejecución bloquee `npm.ps1`.
- En este proyecto, los IDs del modo demo son sintéticos; las rutas API deben resolver la rama demo antes de validar IDs específicos de MongoDB.
- Las pruebas E2E deben ejecutarse contra una instancia aislada en modo demo o testing, nunca contra datos de producción.

## UI y branding

- Para crear o modificar pantallas usá la skill `frontend-design`.
- Usá Tailwind CSS para los estilos de la interfaz.
- Leé `DESIGN.md` antes de cualquier cambio visual y respetá sus decisiones de branding, tipografía, color, espaciado y responsive.
- Priorizá accesibilidad, HTML semántico, navegación por teclado y estados claros.

## Seguridad y datos

- Nunca hardcodees secretos, credenciales o connection strings en los archivos del proyecto.
- Guardá secretos en variables de entorno del servidor. `.env` es local y nunca debe commitearse.
- No incluyas datos personales de leads en logs, bundles del cliente ni mensajes de error públicos.
- Validá siempre los datos en el servidor, incluso si ya fueron validados en el navegador.
- Toda ruta del panel y toda operación de administración debe requerir una sesión válida.

## Git y publicación

- El remoto principal es `git@github.com:marcelafortecarjunin-cyber/webapp-pda.git` y la rama principal es `main`.
- Antes de cada commit, revisá `git status` y confirmá que no haya `.env`, claves privadas, tokens, connection strings ni artefactos generados.
- Nunca uses `git push --force` sobre `main`; preservá el historial remoto y resolvé conflictos explícitamente.
- Usá SSH con verificación de host habilitada; nunca desactives `StrictHostKeyChecking` para evitar errores de autenticación.
- Si cambia el flujo de GitHub, el remoto, la rama principal o el proceso de publicación, actualizá `README.md` en la misma tarea.

## Performance y SEO

- Mantené la landing renderizada en servidor siempre que sea posible.
- Evitá JavaScript cliente y dependencias pesadas innecesarias en el primer viewport.
- Optimizá imágenes con `next/image`, tamaños responsive y carga diferida cuando corresponda.
- Verificá Core Web Vitals, metadata, sitemap, robots y datos estructurados antes de publicar.

## Testing obligatorio

- Usá Vitest para pruebas unitarias y de integración. Los tests viven en `tests/unit` y `tests/integration`.
- Usá el MCP oficial de Playwright (`microsoft/playwright-mcp`) para pruebas end-to-end reales en navegador. Su configuración está en `.cursor/mcp.json`.
- Los flujos E2E deben probar la aplicación levantada con `DEMO_MODE=true` o con una base de testing aislada; nunca uses datos de producción.
- No des por terminada una tarea sin ejecutar y revisar:
  - `npm.cmd run test:run`
  - `npm.cmd run lint`
  - `npm.cmd run typecheck`
  - `npm.cmd run build`
  - los flujos E2E relevantes mediante Playwright MCP.
- Si una prueba falla, corregí la causa o documentá explícitamente el bloqueo; no ocultes fallos ni los conviertas en tests condicionales.

## Comandos

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
npm run seed:admin
npm run test:run
```
<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

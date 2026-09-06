# Dirección de diseño

## Idea

La experiencia se siente como un tablero editorial de movilidad: directa, confiable y con energía. La interfaz debe transmitir que elegir un plan es el primer movimiento hacia el auto propio, no un trámite burocrático.

## Sistema visual

- **Tono:** editorial, industrial y optimista; mezcla de precisión operativa con el impulso de la ruta.
- **Paleta:** `#10151A` (tinta), `#F4F1EB` (papel), `#FFFDF8` (tarjeta), `#F4D000` (amarillo Chevrolet), `#D9F96F` (señal).
- **Tipografía:** Barlow Condensed para titulares de alto impacto y DM Sans para lectura, controles y datos.
- **Composición:** bloques amplios, bordes redondeados generosos, líneas de grilla, acentos amarillos y sombras sólidas discretas.
- **Iconografía:** simple, geométrica y preferentemente inline; no usar emojis como iconos funcionales.

## Landing

- El primer viewport debe explicar qué se ofrece, para quién y cuál es el siguiente paso.
- El CTA principal siempre debe ser visible y contrastar con el fondo.
- Los modelos se presentan como tarjetas comparables: imagen, nombre, cuota de referencia, aclaración y acción.
- Usar movimiento breve y funcional: entrada escalonada, hover de tarjetas y foco visible. Respetar `prefers-reduced-motion`.
- En mobile, priorizar lectura, formulario y botones cómodos para el pulgar.

## Panel admin

- Mantener la misma identidad, con mayor densidad de información y menos decoración.
- Usar tablas legibles, estados con texto y color, filtros simples y feedback inmediato.
- No ocultar acciones importantes únicamente detrás de iconos.

## Accesibilidad

- Mantener contraste suficiente, foco visible, labels asociados, `aria-live` para resultados y HTML semántico.
- No comunicar significado únicamente con color.
- Las imágenes deben tener texto alternativo útil; las decorativas deben marcarse como tales.

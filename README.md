# Estudio Gonzalez y Asociados — Sitio web

Sitio del Estudio Jurídico Gonzalez y Asociados (Liliana Gonzalez, Mat. N.º 12727 — Colegio de Abogados de Mendoza), especializado en Derecho Previsional.

## Estructura del sitio

```
├── index.html          → Inicio
├── areas.html           → Áreas de práctica (resumen)
├── previsional.html     → Detalle de cada trámite previsional
├── blog.html             → Índice del blog
├── blog-reajuste.html    → Artículo de ejemplo
├── sobre-mi.html         → Sobre Liliana Gonzalez
├── contacto.html         → Formulario de contacto
├── styles.css            → Estilos de todo el sitio (OBLIGATORIO subirlo)
└── img/
    └── liliana-gonzalez.jpeg
```

⚠️ **Importante:** `styles.css` y la carpeta `img/` deben subirse junto con los `.html`, en la raíz del repositorio (no dentro de otra carpeta). Si falta `styles.css`, el sitio se ve sin diseño (letras genéricas, sin colores).

---

## Cómo publicarlo en GitHub Pages

1. Entrá a [github.com](https://github.com) y creá un repositorio nuevo (público), por ejemplo `estudio-gonzalez`.
2. Hacé clic en **"uploading an existing file"** (o "Add file" → "Upload files").
3. Arrastrá **todos** los archivos de esta carpeta, incluyendo la carpeta `img` completa y `styles.css`.
4. Hacé clic en **"Commit changes"**.
5. Andá a **Settings → Pages** (en el menú lateral del repositorio).
6. En "Branch", elegí `main` y la carpeta `/ (root)`, y guardá.
7. Esperá 1-2 minutos. Tu sitio va a quedar publicado en:
   `https://tu-usuario.github.io/estudio-gonzalez/`

Para verificar que todo subió bien: en la página principal del repositorio tenés que ver los 8 archivos `.html`, el archivo `styles.css` y la carpeta `img` — todos al mismo nivel.

---

## Calendario de turnos (Calendly) — ya conectado ✅

El calendario en `contacto.html` ya está enlazado a tu cuenta: `https://calendly.com/estudiojuridicogonzalez`.

Solo falta que entres a [calendly.com](https://calendly.com) y confirmes:
- Que tengas un tipo de evento activo (ej. "Consulta previsional", 20-30 min)
- Tus días y horarios disponibles
- Si querés, sincronizarlo con tu Google Calendar desde la configuración de Calendly, para que los turnos aparezcan ahí automáticamente

Si más adelante creás un evento con otro nombre o cambiás de link, hay que actualizar la línea `data-url` dentro de `contacto.html`.

## Base de datos de consultas (Google Sheets) — así se analizan después

El formulario de `contacto.html` está preparado para guardar cada consulta como una fila en una **Google Sheet** (gratis, sin límite de cantidad, ideal para filtrar y analizar después). El archivo `google-apps-script.gs` tiene el código y las instrucciones detalladas, paso a paso, para conectarlo:

1. Creá una Google Sheet nueva con las columnas: `Fecha | Nombre | Contacto | Tema | Mensaje`
2. Extensiones → Apps Script, pegá el contenido de `google-apps-script.gs`
3. Implementar → Nueva implementación → Aplicación web → "Cualquier usuario" con acceso
4. Copiá la URL que termina en `/exec`
5. Pegala en `contacto.html`, en esta línea:
   ```html
   <form id="contact-form" action="PEGAR_ACA_LA_URL_DEL_APPS_SCRIPT" onsubmit="return false;">
   ```

Con esto activado: cada consulta queda como fila en tu planilla (para filtrar por tema, contar consultas por mes, etc.) **y** además te llega un email de notificación al instante — todo gratis y sin límite mensual.

> ¿Por qué no usamos Formspree para esto? Formspree gratis solo guarda 50 consultas por mes, las borra a los 30 días, y exportarlas a CSV es una función paga. Para tener una base de datos acumulable y analizable sin pagar, Google Sheets es la opción más simple.

---

## Próximos pasos sugeridos

Están detallados en `guia-tecnica.md` (asistente de IA con agenda de turnos, dominio propio, SEO y campañas de Google/Meta Ads). Se puede avanzar con eso cuando quieras.

## Pendientes de contenido

- [ ] Reemplazar el dominio de ejemplo por uno propio (opcional, GitHub Pages funciona sin comprarlo)
- [ ] Sumar más artículos al blog (hay 4 títulos ya planteados en `blog.html` sin desarrollar)
- [ ] Revisar y ajustar los textos legales antes de la publicación final

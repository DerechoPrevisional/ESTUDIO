# Guía técnica — Bienvenido Previsional
### De mockup a sitio funcionando en producción

Esta guía explica qué falta conectar para que el sitio deje de ser una demostración y funcione de verdad: asistente de IA, agenda de turnos, hosting/dominio y posicionamiento.

---

## 1. Asistente de IA que agenda turnos

El chat que ves en el sitio es una animación. Para que funcione de verdad necesitás tres piezas conectadas entre sí:

**a) El "cerebro" conversacional**
Un modelo de lenguaje (por ejemplo, vía la API de Anthropic o OpenAI) que reciba el mensaje del usuario y responda de forma natural, seleccione el tema (jubilación, reajuste, pensión, incapacidad) y pida los datos de contacto.

**b) La conexión con el calendario**
El asistente necesita poder consultar horarios libres y reservar un turno. Opciones según tu nivel técnico:
- **Sin desarrollo propio (más simple):** usar Calendly o un widget similar, y que el asistente de IA solo derive al usuario a ese calendario una vez identificado el tema.
- **Con desarrollo (más integrado):** conectar directamente a la API de Google Calendar, para que el propio chat muestre y reserve el turno sin salir de la conversación.

**c) Dónde vive el chat**
Un pequeño servidor (backend) que reciba los mensajes del visitante, se los pase al modelo de IA, y devuelva la respuesta. Esto no puede vivir "solo en el HTML" — necesita alguien que lo programe y lo aloje. Opciones sin equipo técnico propio:
- Herramientas no-code como **Chatbase**, **Voiceflow** o **Landbot**, que permiten armar el flujo (nombre → tema → turno) sin programar, y se insertan en la web con un simple código que te dan ellos.
- Contratar a un desarrollador para una integración a medida si más adelante querés algo más sofisticado (ej. que consulte el estado de un expediente).

**Recomendación para empezar:** una herramienta no-code conectada a Calendly. Es rápido de montar, no requiere mantenimiento técnico, y ya resuelve el 90% de lo que pediste (nombre, tema, turno).

---

## 2. Hosting y dominio

El sitio que armamos es HTML estático, así que es muy económico de alojar. Pasos:

1. **Comprar el dominio** (ej. `bienvenidoprevisional.com`) en un registrador como Namecheap o Google Domains.
2. **Elegir hosting:**
   - **Netlify o Vercel** (gratis o muy económico): ideal para este tipo de sitio, se sube arrastrando la carpeta o conectando un repositorio de GitHub.
   - **Hosting tradicional** (ej. Hostinger): si preferís algo más parecido a lo que ya conocés.
3. **Conectar el dominio al hosting** (esto lo guía la misma plataforma paso a paso).
4. **Certificado SSL** (candadito de "sitio seguro"): Netlify/Vercel lo activan automáticamente y sin costo.

---

## 3. Posicionamiento (SEO + Google Ads + Meta Ads)

**SEO (gratis, resultado a mediano plazo)**
- Crear y completar tu ficha de **Google Business Profile** (nombre, dirección si atendés presencial, horarios, categoría "Abogado" o "Servicio previsional").
- Publicar artículos de blog regularmente con palabras clave específicas ("cómo reclamar jubilación", "pensión por viudez requisitos") — ya dejamos 2 artículos de ejemplo y 4 títulos más listados en el blog para que sigas esa línea.
- Verificar el sitio en **Google Search Console** para que Google indexe todas las páginas.

**Google Ads (pago, resultado inmediato)**
- Campaña de búsqueda con palabras clave de intención alta: "abogado jubilación", "reclamo reajuste jubilatorio", etc.
- Presupuesto inicial recomendado para probar: modesto y acotado a tu zona geográfica, ajustando según qué palabras traen consultas reales.

**Meta Ads (pago, para dar a conocer el estudio)**
- Contenido tipo "¿Sabías que...?" sobre derechos previsionales, con el objetivo de generar reconocimiento más que consultas inmediatas.
- Funciona mejor cuando ya tenés el SEO y el asistente de IA funcionando, para no gastar en tráfico que después no sabe cómo contactarte.

---

## 4. Orden sugerido para avanzar

1. Revisar y ajustar los textos del sitio (nombre real del estudio, matrícula, datos de contacto)
2. Conseguir 2-3 fotos profesionales tuyas para reemplazar los placeholders
3. Comprar dominio + subir el sitio a Netlify o Vercel
4. Configurar Google Business Profile
5. Montar el chat con una herramienta no-code (Chatbase/Voiceflow) conectado a Calendly
6. Recién después, si querés, sumar Google Ads y Meta Ads

Cualquiera de estos pasos lo podemos ir trabajando juntos cuando quieras avanzar.

# Sistema interno de gestión — Estudio Gonzalez y Asociados

**Importante: esto es privado.** Vive en una Google Sheet tuya, en tu Google Drive personal — nadie más tiene acceso salvo que vos compartas el link. No tiene ninguna conexión con la web pública, más allá de que las consultas nuevas ya llegan automáticamente a la pestaña "Consultas" (esto ya lo tenés armado desde el `google-apps-script.gs`).

## Estructura: 4 pestañas nuevas en la misma planilla

Abrí la misma Google Sheet donde ya te llegan las consultas, y agregá estas pestañas (click derecho en la pestaña "Consultas" → Insertar hoja):

### 1. Pestaña "Casos"
Acá pasás una consulta a caso activo cuando decidís tomarlo.

| Columna | Contenido |
|---|---|
| A: ID Caso | Un código simple, ej: `2026-001` |
| B: Cliente | Nombre y apellido |
| C: Especialidad | Jubilación ordinaria / Reajuste / Pensión / Incapacidad / Otro |
| D: Fecha inicio | La fecha en que arrancó el trámite |
| E: Días en trámite | Fórmula (ver abajo) |
| F: Estado | En curso / Presentado / Resuelto / Archivado |
| G: Último avance | Notas cortas del último paso dado |
| H: Honorarios pactados | Monto total acordado con el cliente |
| I: Cobrado | Fórmula, suma automática desde "Pagos" (ver abajo) |
| J: Saldo pendiente | Fórmula: Honorarios − Cobrado |

**Fórmula columna E (Días en trámite)**, en la celda E2:
```
=IF(D2="","",TODAY()-D2)
```
Arrastrala hacia abajo para el resto de las filas. Va a mostrar cuántos días lleva cada trámite, actualizándose solo cada día.

**Fórmula columna I (Cobrado)**, en la celda I2:
```
=SUMIF(Pagos!B:B, A2, Pagos!D:D)
```
Suma automáticamente todos los pagos registrados en la pestaña "Pagos" que correspondan a ese ID de caso.

**Fórmula columna J (Saldo pendiente)**, en la celda J2:
```
=H2-I2
```

### 2. Pestaña "Pagos"
Cada vez que el cliente te paga algo (aunque sea parcial), agregás una fila acá.

| Columna | Contenido |
|---|---|
| A: Fecha | Fecha del pago |
| B: ID Caso | Debe coincidir con el ID de la pestaña "Casos" |
| C: Cliente | Nombre (para buscar rápido) |
| D: Monto | Monto recibido |
| E: Método | Efectivo / Transferencia / Otro |
| F: Observaciones | Lo que quieras anotar |

### 3. Pestaña "Gastos"
Los gastos que tenés por cada expediente (sellados, movilidad, copias, peritos, etc.)

| Columna | Contenido |
|---|---|
| A: Fecha | Fecha del gasto |
| B: ID Caso | Debe coincidir con el ID de la pestaña "Casos" |
| C: Concepto | Ej: "Sellado inicial", "Pericia médica" |
| D: Monto | Monto gastado |
| E: Comprobante | Podés pegar un link a una foto del comprobante subida a Drive, o simplemente una nota |

### 4. Pestaña "Balance"
El resumen general, para ver de un vistazo cómo estás parada.

**Balance por caso** — en una celda, para cada ID de caso:
```
=SUMIF(Pagos!B:B, "2026-001", Pagos!D:D) - SUMIF(Gastos!B:B, "2026-001", Gastos!D:D)
```
(Reemplazá "2026-001" por el ID de caso que quieras ver, o armá una tabla con un ID por fila.)

**Balance general del estudio** (todos los casos):
```
=SUM(Pagos!D:D) - SUM(Gastos!D:D)
```

**Total cobrado en el mes actual:**
```
=SUMIFS(Pagos!D:D, Pagos!A:A, ">="&EOMONTH(TODAY(),-1)+1, Pagos!A:A, "<="&EOMONTH(TODAY(),0))
```

## Cómo ordenar por especialidad

En la pestaña "Casos": seleccioná todas las columnas → menú **Datos → Crear un filtro**. Ahora podés hacer clic en la flechita de la columna "Especialidad" y elegir ver solo, por ejemplo, "Jubilación ordinaria". Esto te arma automáticamente una vista filtrada sin tocar los datos.

Alternativa más avanzada (una pestaña nueva "Por especialidad"):
```
=FILTER(Casos!A:J, Casos!C:C="Jubilación ordinaria")
```

## Flujo de trabajo sugerido

1. Llega una consulta nueva → aparece sola en "Consultas" (automático) + te llega el email
2. Decidís tomar el caso → copiás los datos relevantes a una fila nueva en "Casos", le asignás un ID
3. A medida que avanza → actualizás "Último avance" y "Estado"
4. Cuando el cliente paga → fila nueva en "Pagos"
5. Cuando gastás algo del expediente → fila nueva en "Gastos"
6. La pestaña "Balance" se actualiza sola con las fórmulas

## Privacidad

- Esta planilla no está vinculada a la web pública en ningún lugar
- Por defecto, solo vos tenés acceso (tu cuenta de Google)
- Si en algún momento necesitás que otra persona (contador, asistente) la vea, usás el botón "Compartir" de Google Sheets y le das acceso solo a esa persona — nunca queda pública salvo que vos actives "cualquiera con el link"

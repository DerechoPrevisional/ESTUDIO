/**
 * CÓDIGO PARA GOOGLE APPS SCRIPT (proyecto independiente, conectado por ID)
 * Se conecta directo a tu planilla usando su ID, sin depender de que el
 * proyecto esté "vinculado" automáticamente (eso fue lo que se rompió).
 *
 * INSTALACIÓN:
 * 1) En script.google.com, creá un proyecto nuevo (ya lo hiciste)
 * 2) Borrá el código de ejemplo y pegá TODO este archivo
 * 3) Guardá (Ctrl+S)
 * 4) Implementar → Nueva implementación → tipo "Aplicación web"
 *    - Ejecutar como: "Yo"
 *    - Quién tiene acceso: "Cualquier usuario"
 *    → Implementar → autorizá los permisos que te pida (Avanzado → Ir al
 *    proyecto (no seguro) → Permitir)
 * 5) Te va a dar una URL nueva (termina en /exec) — esta vez SÍ va a ser
 *    distinta a la que tenías antes. Pasámela para actualizar la web y el panel.
 */

var SPREADSHEET_ID = "1a3ovbBL5OcrHz3k6N9pzPl7pOkhk5KmPUgd6Lp_5rDA";

function getSheet(name) {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (name === "Consultas") {
      sheet.appendRow(["Fecha", "Nombre", "Contacto", "Tema", "Mensaje"]);
    } else if (name === "Casos") {
      sheet.appendRow(["ID Caso", "Cliente", "Especialidad", "Fecha inicio", "Estado", "Último avance", "Honorarios pactados"]);
    } else if (name === "Pagos") {
      sheet.appendRow(["Fecha", "ID Caso", "Cliente", "Monto", "Método", "Observaciones"]);
    } else if (name === "Gastos") {
      sheet.appendRow(["Fecha", "ID Caso", "Concepto", "Monto", "Comprobante"]);
    }
  }
  return sheet;
}

function sheetToObjects(sheet) {
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  var headers = data[0];
  var rows = data.slice(1);
  return rows
    .filter(function(row){ return row.join("") !== ""; })
    .map(function(row){
      var obj = {};
      headers.forEach(function(h, i){ obj[h] = row[i]; });
      return obj;
    });
}

// ---- GET: el panel interno pide todos los datos ----
function doGet(e) {
  var casos = sheetToObjects(getSheet("Casos"));
  var pagos = sheetToObjects(getSheet("Pagos"));
  var gastos = sheetToObjects(getSheet("Gastos"));
  var payload = { casos: casos, pagos: pagos, gastos: gastos };

  // El panel interno pide los datos con ?callback=nombreFuncion para esquivar
  // la restricción del navegador. Si viene ese parámetro, respondemos como JS.
  if (e.parameter.callback) {
    return ContentService.createTextOutput(
      e.parameter.callback + "(" + JSON.stringify(payload) + ");"
    ).setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService.createTextOutput(
    JSON.stringify(payload)
  ).setMimeType(ContentService.MimeType.JSON);
}

// ---- POST: puede ser una consulta pública (web) o una acción del panel interno ----
function doPost(e) {
  var action = e.parameter.action || "consulta";

  if (action === "consulta") {
    return handleConsultaPublica(e);
  } else if (action === "nuevoCaso") {
    var casos = getSheet("Casos");
    casos.appendRow([
      e.parameter.id, e.parameter.cliente, e.parameter.especialidad,
      e.parameter.fechaInicio, e.parameter.estado || "En curso",
      e.parameter.ultimoAvance || "", e.parameter.honorarios || 0
    ]);
  } else if (action === "actualizarCaso") {
    var casosSheet = getSheet("Casos");
    var data = casosSheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (String(data[i][0]) === String(e.parameter.id)) {
        casosSheet.getRange(i + 1, 5).setValue(e.parameter.estado || data[i][4]);
        casosSheet.getRange(i + 1, 6).setValue(e.parameter.ultimoAvance || data[i][5]);
        if (e.parameter.honorarios) casosSheet.getRange(i + 1, 7).setValue(e.parameter.honorarios);
        break;
      }
    }
  } else if (action === "nuevoPago") {
    var pagos = getSheet("Pagos");
    pagos.appendRow([
      e.parameter.fecha, e.parameter.id, e.parameter.cliente,
      e.parameter.monto, e.parameter.metodo || "", e.parameter.observaciones || ""
    ]);
  } else if (action === "nuevoGasto") {
    var gastos = getSheet("Gastos");
    gastos.appendRow([
      e.parameter.fecha, e.parameter.id, e.parameter.concepto,
      e.parameter.monto, e.parameter.comprobante || ""
    ]);
  }

  return ContentService.createTextOutput(
    JSON.stringify({ result: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}

// ---- Lógica original: consulta pública desde la web (sin cambios de comportamiento) ----
function handleConsultaPublica(e) {
  var sheet = getSheet("Consultas");

  var nombre = e.parameter.nombre || "";
  var contacto = e.parameter.contacto || "";
  var tema = e.parameter.tema || "";
  var mensaje = e.parameter.mensaje || "";
  var fecha = new Date();

  sheet.appendRow([fecha, nombre, contacto, tema, mensaje]);

  var destinatario = "gonzalezyasociadoslegales@gmail.com";
  var asunto = "Nueva consulta web: " + nombre + " (" + tema + ")";
  var cuerpo = "Nombre: " + nombre + "\n" +
               "Contacto: " + contacto + "\n" +
               "Tema: " + tema + "\n" +
               "Mensaje: " + mensaje + "\n\n" +
               "Se guardó automáticamente en tu planilla de consultas.";

  MailApp.sendEmail(destinatario, asunto, cuerpo);

  return ContentService.createTextOutput(
    JSON.stringify({ result: "ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}

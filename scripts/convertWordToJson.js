import mammoth from 'mammoth'
import textract from 'textract'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'

const textractFromFileAsync = promisify(textract.fromFileWithPath)

/**
 * Convierte el texto del documento en un array de líneas
 * Cada línea representa un párrafo (separado por Enter)
 */
function extractContent(fullText) {
  // Dividir por saltos de línea y filtrar líneas vacías
  const lines = fullText.split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)

  return lines
}

/**
 * Convierte un archivo .doc o .docx a JSON
 */
async function convertDocToJson(filePath) {
  try {
    console.log(`Procesando: ${filePath}`)

    const ext = path.extname(filePath).toLowerCase()
    let text = ''

    if (ext === '.docx') {
      // Usar mammoth para archivos .docx
      const buffer = await fs.readFile(filePath)
      const result = await mammoth.extractRawText({ buffer })
      text = result.value
    } else if (ext === '.doc') {
      // Usar textract para archivos .doc (formato antiguo)
      try {
        text = await textractFromFileAsync(filePath)
      } catch (docError) {
        if (docError.message.includes('antiword')) {
          console.error('✗ Error: antiword no está instalado. Opciones:')
          console.error('  1. Instalar antiword: choco install antiword')
          console.error(`  2. Convertir ${path.basename(filePath)} a .docx usando Word`)
          return null
        }
        throw docError
      }
    } else {
      console.warn(`Formato no soportado: ${ext}`)
      return null
    }

    // Extraer contenido (dividido por líneas)
    const content = extractContent(text)

    // Crear objeto simple con nombre de archivo y contenido
    const fileName = path.basename(filePath, path.extname(filePath))
    const speechData = {
      fileName,
      content
    }

    console.log(`✓ Convertido: ${fileName} (${content.length} líneas)`)

    return speechData
  } catch (error) {
    console.error(`✗ Error procesando ${path.basename(filePath)}:`, error.message)
    return null
  }
}

/**
 * Procesa todos los archivos .doc y .docx en una carpeta y subcarpetas
 */
async function processFolder(folderPath, outputFile) {
  const speeches = []

  async function scanDirectory(dir) {
    const entries = await fs.readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        // Recursivamente procesar subcarpetas
        await scanDirectory(fullPath)
      } else if (entry.isFile() && (entry.name.endsWith('.docx') || entry.name.endsWith('.doc'))) {
        // Ignorar archivos de metadatos de macOS
        if (entry.name.startsWith('._')) {
          console.log(`⊘ Ignorando archivo de metadatos: ${entry.name}`)
          continue
        }

        // Convertir archivo .doc o .docx
        const speechData = await convertDocToJson(fullPath)
        if (speechData) {
          speeches.push(speechData)
        }
      }
    }
  }

  await scanDirectory(folderPath)

  // Ordenar por nombre de archivo
  speeches.sort((a, b) => a.fileName.localeCompare(b.fileName))

  // Generar el archivo JavaScript
  const jsContent = `/* eslint-disable no-unused-expressions */
export const speeches = ${JSON.stringify(speeches, null, 2)}
`

  await fs.writeFile(outputFile, jsContent, 'utf-8')

  console.log(`\n✓ Procesados ${speeches.length} discursos`)
  console.log(`✓ Archivo generado: ${outputFile}`)
}

// Uso del script
const args = process.argv.slice(2)

if (args.length < 1) {
  console.log('Uso: node convertWordToJson.js <carpeta-con-docx> [archivo-salida]')
  console.log('Ejemplo: node convertWordToJson.js ./discursos ./src/data/speeches.js')
  process.exit(1)
}

const inputFolder = args[0]
const outputFile = args[1] || './speeches.js'

processFolder(inputFolder, outputFile)
  .then(() => console.log('\n✓ Conversión completada'))
  .catch(error => console.error('Error:', error))

# Conversor de Word a JSON

Este script convierte documentos de Word (.doc y .docx) con discursos a formato JSON compatible con el proyecto.

**Formatos soportados:**
- `.docx` - Formato moderno de Word (2007+)
- `.doc` - Formato antiguo de Word (97-2003)

## Instalación

```bash
cd scripts
npm install
```

## Uso

### Opción 1: Convertir una carpeta completa

```bash
node convertWordToJson.js <carpeta-con-docx> [archivo-salida]
```

**Ejemplo:**
```bash
node convertWordToJson.js ./discursos ../src/data/speeches.js
```

Esto procesará todos los archivos `.docx` en la carpeta `./discursos` (incluyendo subcarpetas) y generará el archivo `speeches.js`.

### Opción 2: Usar el script npm

```bash
npm run convert -- ./discursos ../src/data/speeches.js
```

## Cómo funciona

El script lee cada documento Word y:
1. Extrae todo el texto del documento
2. Divide el contenido por cada salto de línea (Enter)
3. Filtra las líneas vacías
4. Crea un objeto JSON con el nombre del archivo y el contenido

## Formato de salida

El script genera un archivo JavaScript con el siguiente formato:

```javascript
export const speeches = [
  {
    "fileName": "discurso_01_01_1959",
    "content": [
      "DISCURSO PRONUNCIADO POR EL DOCTOR FIDEL CASTRO RUZ...",
      "VERSIONES TAQUIGRAFICAS - CONSEJO DE ESTADO",
      "Santiagueros;",
      "Compatriotas de toda Cuba:",
      "Al fin hemos llegado a Santiago...",
      "..."
    ]
  },
  {
    "fileName": "discurso_21_01_1959",
    "content": [
      "Honorable señor Presidente de la República;",
      "Señores del Cuerpo Diplomático;",
      "..."
    ]
  }
]
```

Cada objeto contiene:
- `fileName`: Nombre del archivo Word (sin extensión)
- `content`: Array con cada línea del documento (separadas por Enter)

## Organización de archivos

Puedes organizar tus documentos Word en carpetas por fecha, por ejemplo:

```
discursos/
├── 1959/
│   ├── enero/
│   │   ├── discurso_01_01_1959.docx
│   │   └── discurso_21_01_1959.doc
│   └── febrero/
│       └── discurso_15_02_1959.docx
└── 1960/
    └── ...
```

El script procesará recursivamente todas las subcarpetas y ordenará los discursos por fecha automáticamente.

## Notas

- Cada línea en el documento Word se convierte en un elemento del array `content`
- Las líneas vacías se filtran automáticamente
- Los discursos se ordenan alfabéticamente por nombre de archivo
- Si un archivo no se puede procesar, se muestra un error pero continúa con los demás
- El script ignora automáticamente archivos de metadatos de macOS (archivos que empiezan con `._`)

## Solución de Problemas

### Error con archivos .doc: "antiword is not installed"

Los archivos `.doc` (formato antiguo) requieren la herramienta `antiword`. Tienes dos opciones:

**Opción 1: Instalar antiword**
```bash
# En Windows con Chocolatey
choco install antiword
```

**Opción 2: Convertir a .docx (Recomendado)**
1. Abre los archivos .doc en Microsoft Word
2. Guárdalos como .docx (Archivo → Guardar como → Formato: .docx)
3. Ejecuta el script nuevamente

### Archivos ._* (metadatos de macOS)

El script ignora automáticamente estos archivos. Si ves mensajes como "⊘ Ignorando archivo de metadatos", es normal y no afecta la conversión.

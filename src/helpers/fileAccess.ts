export async function saveJSONToFileHandle(fileHandle: any, json: any) {
  const writable = await fileHandle.createWritable()
  await writable.write(JSON.stringify(json))
  await writable.close()
}

export async function loadJSONFromPickedFile(onFileHandle?: (fileHandle: any) => void) {
  const [ fileHandle ] = await window.showOpenFilePicker()
  if (fileHandle) {
    if (onFileHandle) onFileHandle(fileHandle)
    const file = await fileHandle.getFile()
    const data = await file.text()
    return JSON.parse(data)
  } else {
    return null
  }
}

export function getTrimmedFileName(fileHandle: any) {
  const name = fileHandle.name
  return name.slice(0, name.length - 3)
}
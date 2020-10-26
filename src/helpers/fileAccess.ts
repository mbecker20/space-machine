import { ContainerSave } from "../redux/stateTSTypes"

export async function saveJSONToFileHandle(fileHandle: FileSystemFileHandle, json: any) {
  const writable = await fileHandle.createWritable()
  await writable.write(JSON.stringify(json))
  await writable.close()
}

export async function loadJSONFromPickedFile(onFileHandle?: (fileHandle: FileSystemFileHandle) => void) {
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

export async function saveJSONToChosenFile(json: any, onSaved?: () => void) {
  window.saveFileHandle = await window.showSaveFilePicker({
    types: [
      {
        description: 'space machine project',
        accept: {
          'example/*': ['.sm'],
        },
      }
    ]
  })
  await saveJSONToFileHandle(window.saveFileHandle, json)
  if (onSaved) onSaved()
} 

export function getTrimmedSMFileName(fileHandle: FileSystemFileHandle) {
  const name = fileHandle.name
  return name.slice(0, name.length - 3)
}

export async function getDirectoryContentNames(dirHandle: FileSystemDirectoryHandle) {
  let names: string[] = []
  for await (const entry of dirHandle.values()) {
    names.push(entry.name)
  }
  return names
}

export async function getDirectorySMMNames(dirHandle: FileSystemDirectoryHandle) {
  const allNames = await getDirectoryContentNames(dirHandle)
  return allNames.filter(name => name.length > 4 && name.slice(name.length - 4) === '.smm')
    .map(name => name.slice(0, name.length - 4))
}

export async function saveSMM(dirHandle: FileSystemDirectoryHandle, saveName: string, containerSave: ContainerSave) {
  const fileHandle = await dirHandle.getFileHandle(`${saveName}.smm`, { create: true })
  await saveJSONToFileHandle(fileHandle, containerSave)
}

export async function getSavedSMMFromName(dirHandle: FileSystemDirectoryHandle, saveName: string): Promise<ContainerSave> {
  const fileHandle = await dirHandle.getFileHandle(`${saveName}.smm`)
  const file = await fileHandle.getFile()
  const stringData = await file.text()
  return JSON.parse(stringData)
}
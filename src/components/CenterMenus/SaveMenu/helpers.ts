export function getFileDirectory(badDir: string) {
  for (var i = badDir.length; i > 0; i--) {
    if (badDir[i] === '/') {
      return badDir.slice(0, i + 1)
    }
  }
  return badDir
}
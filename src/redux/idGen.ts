function genRandomID(index: number, totNumber: number) {
  return `${totNumber}${index}${2048 * Math.random()}`
}

export default genRandomID
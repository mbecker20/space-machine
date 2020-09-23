function genRandomID(index: number, totNumber: number) {
  return `${totNumber}${index}${Math.floor(20480 * Math.random())}`
}

export default genRandomID
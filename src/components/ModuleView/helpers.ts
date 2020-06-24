import { ContainerModules } from "../../redux/stateTSTypes"

export function range(start: number, stop: number) {
	// returns list of integers from start (inclusive) to stop (exclusive)
	var out = []
	for (var i = start; i < stop; i++) {
		out.push(i)
	}
	return out
}

export function getGridRange(childContainers: string[], containerModules: ContainerModules) {
  let maxRow = 0
  let maxCol = 0 // min col is always 0
  childContainers.forEach(containerID => {
    const cm = containerModules[containerID]

    if (cm.row > maxRow) {
      maxRow = cm.row
    }

    if (cm.col > maxCol) {
      maxCol = cm.col
    }
  })
  return { maxRow, maxCol }
}
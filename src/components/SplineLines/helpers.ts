import p5Types from 'p5'

type Pos = [number, number]

function drawLine(p5: p5Types, positions: Pos[]) {
  for (let i = 0; i < positions.length - 1; i++) {
    p5.line(
      positions[i][0],
      positions[i][1],
      positions[i + 1][0],
      positions[i + 1][1]
    )
  }
}
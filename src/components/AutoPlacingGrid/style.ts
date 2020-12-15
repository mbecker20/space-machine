import { createUseStyles } from 'react-jss'

const useJSS = createUseStyles({
  AutoPlacingGrid: {
    display: 'grid',
    gridTemplateRows: ({ numRows }) => `repeat(${numRows}, auto)`,
    gridTemplateColumns: ({ numCols }) => `repeat(${numCols}, auto)`,
    gridAutoFlow: ({ direction }) => direction,
    gridAutoRows: ({ numRows }) => numRows ? null : 'auto',
    gridAutoColumns: ({ numCols }) => numCols ? null : 'auto',
    gap: ({ gap }) => gap,
    justifyItems: 'center',
  },
})

export default useJSS
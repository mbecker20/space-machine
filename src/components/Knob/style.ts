import { createUseStyles } from 'react-jss'
import { sizes } from '../../theme/theme'

const useJSS = createUseStyles({
  KnobContainer: {
    display: 'grid',
    gridTemplateRows: 'auto',
    gridTemplateColumns: 'auto',
    placeItems: 'center',
  },

  KnobSVG: {
    gridRow: '1',
    gridColumn: '1',
    width: `${sizes.knob.size}vmin`,
    height: `${sizes.knob.size}vmin`,
    zIndex: 9,
  },

  KnobText: {
    gridRow: '1',
    gridColumn: '1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: sizes.text.xsmall,
    color: 'black',
    zIndex: 10,
  }
})

export default useJSS
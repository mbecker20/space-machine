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
    //display: 'flex',
    //alignItems: 'center',
    //justifyContent: 'center',
    fontSize: sizes.text.xsmall,
    textAlign: 'center',
    color: 'black',
    zIndex: 10,
    width: '2em',
    borderStyle: 'none',
    backgroundColor: 'transparent',
    '&::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },
    '&::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    }
  },

  InteractionLayer: {
    gridRow: '1',
    gridColumn: '1',
    zIndex: 11,
    width: `${sizes.knob.size}vmin`,
    height: `${sizes.knob.size}vmin`,
    '&:title': {
      fontsize: sizes.text.medium
    }
  }
})

export default useJSS
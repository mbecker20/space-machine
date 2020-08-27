import { createUseStyles } from 'react-jss'
import { sizes, colors } from '../../../theme/theme'

const useJSS = createUseStyles({
  ControlTypeSelect: {
    minWidth: '9vmin',
    maxWidth: '5em',
    margin: '1vmin',
    fontSize: sizes.text.small,
    backgroundColor: colors.knob,
    color: colors.knobText,
    textAlign: 'center',
  },

  ControlInput: {
    minWidth: '9vmin',
    maxWidth: '5em',
    margin: '1vmin',
    fontSize: sizes.text.small
  },

  ControlMenu: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center'
  },

  Pad: {
    width: '10vmin',
    height: '7vmin',
    borderRadius: '2vmin',
  }
})

export default useJSS
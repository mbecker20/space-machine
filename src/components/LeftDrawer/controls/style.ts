import { createUseStyles } from 'react-jss'
import { sizes } from '../../../theme/theme'

const useJSS = createUseStyles({
  ControlTypeSelect: {
    minWidth: '9vmin',
    maxWidth: '5em',
    margin: '1vmin',
    fontSize: sizes.text.small
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
})

export default useJSS
import { createUseStyles } from 'react-jss'
import { colors } from '../../theme/theme'

const useJSS = createUseStyles({
  Button: {
    backgroundColor: colors.defaultButton,
    borderColor: 'transparent',
    borderRadius: '1vmin',
    borderStyle: 'solid',
    '&:active': {
      borderColor: 'transparent',
    },
    '&:hover': {
      cursor: 'pointer',
      borderColor: 'white',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1vmin',
    margin: '1vmin',
    textAlign: 'center',
  },
})

export default useJSS
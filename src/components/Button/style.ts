import { createUseStyles } from 'react-jss'
import { colors } from '../../theme/theme'

const useJSS = createUseStyles({
  Button: {
    backgroundColor: colors.defaultButton,
    borderColor: 'white',
    borderStyle: 'none',
    borderRadius: '1vmin',
    '&:active': {
      borderStyle: 'solid',
    },
    '&:hover': {
      cursor: 'pointer',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default useJSS
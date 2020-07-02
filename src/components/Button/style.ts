import { createUseStyles } from 'react-jss'
import { colors } from '../../theme/theme'

const useJSS = createUseStyles({
  Button: {
    backgroundColor: colors.defaultButton,
    borderColor: 'white',
    borderStyle: 'none',
    '&:active': {
      borderStyle: 'solid',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default useJSS
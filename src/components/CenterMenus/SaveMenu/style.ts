import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../../theme/theme'

const useJSS = createUseStyles({
  CenterMenuInput: {
    backgroundColor: colors.grey,
    color: 'white',
    height: '1em',
    padding: '1vmin',
    margin: '1.5vmin .75vmin 1.5vmin 1.5vmin',
    borderStyle: 'none',
    borderRadius: '1vmin',
    fontSize: sizes.text.medium,
    textAlign: 'center',
    '&:hover': {
      cursor: 'text',
    },
  },
})

export default useJSS
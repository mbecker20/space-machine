import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../../theme/theme'

const useJSS = createUseStyles({
  DeleteButtonBounder: {
    backgroundColor: colors.deleteButton,
    fontSize: sizes.text.small,
    padding: '.2em .4em'
  },

  DeleteButtonSVG: {
    width: '1.5em',
    height: '1.5em',
  }
})

export default useJSS
import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../theme/theme'

const useJSS = createUseStyles({
  DropSquare: {
    width: sizes.moduleView.iconGrid,
    height: sizes.moduleView.iconGrid,
    borderStyle: 'none',
    borderColor: colors.dropSquareHL,
    borderRadius: '10px',
    zIndex: 1,
  },
})

export default useJSS
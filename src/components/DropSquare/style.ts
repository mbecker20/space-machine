import { createUseStyles } from 'react-jss'
import { sizes } from '../../theme/theme'

const useJSS = createUseStyles({
  DropSquare: {
    width: sizes.moduleView.iconGrid,
    height: sizes.moduleView.iconGrid,
    borderStyle: 'solid',
    borderRadius: '10px',
    zIndex: 1,
  },
})

export default useJSS
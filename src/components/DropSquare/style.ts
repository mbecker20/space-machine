import { createUseStyles } from 'react-jss'
import { sizes } from '../../theme/theme'

const useJSS = createUseStyles({
  DropSquare: {
    width: sizes.moduleView.icon,
    height: sizes.moduleView.icon,
    padding: '.5vmin',
    borderStyle: 'solid',
    borderRadius: '10px',
    zIndex: 1,
    '&:hover': {
      cursor: 'pointer',
    },
  },
})

export default useJSS
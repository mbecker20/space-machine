import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../theme/theme'

const useJSS = createUseStyles({
  Fill: {
    backgroundColor: colors.fillModule,
    display: 'grid',
    borderRadius: '2vmin',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    minWidth: sizes.moduleView.iconGrid,
    minHeight: sizes.moduleView.iconGrid,
    alignItems: 'center',
    justifyItems: 'center',
    padding: '2vmin',
    margin: '10vmin',
  },

  Mid: {
    backgroundColor: colors.module,
    width: sizes.moduleView.icon,
    height: sizes.moduleView.icon,
    borderRadius: '1.5vmin',
    borderColor: 'white',
    borderStyle: 'none',
    whiteSpace: 'wrap',
    fontSize: sizes.text.medium,
    padding: '1vmin',
    display: 'flex',
    overflow: 'hidden',
    '&:hover': {
      cursor: 'pointer',
      borderStyle: 'solid',
    }
  },

  Icon: {
    backgroundColor: colors.module,
    width: sizes.moduleView.icon,
    height: sizes.moduleView.icon,
    borderRadius: '1.5vmin',
    '&:hover': {
      cursor: 'pointer'
    }
  },

  DropSquare: {
    width: sizes.moduleView.iconGrid,
    height: sizes.moduleView.iconGrid,
    borderStyle: 'none',
    borderColor: colors.dropSquareHL,
    borderRadius: '10px',
  },
})

export default useJSS
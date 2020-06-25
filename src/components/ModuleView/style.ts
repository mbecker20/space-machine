import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../theme/theme'

const useJSS = createUseStyles({
  Fill: {
    backgroundColor: colors.fillModule,
    display: 'grid',
    borderRadius: '15px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    minWidth: sizes.moduleView.iconGrid,
    //maxWidth: '90%',
    minHeight: sizes.moduleView.iconGrid,
    //maxHeight: '90%',
    alignItems: 'center',
    justifyItems: 'center',
    padding: '20px',
    marginLeft: '10vmin',
    marginTop: '10vmin',
  },

  Mid: {
    backgroundColor: colors.module,
    width: sizes.moduleView.icon,
    height: sizes.moduleView.icon,
    zIndex: 1,
    borderRadius: '10px',
    borderStyle: 'none',
    '&:hover': {
      cursor: 'pointer',
      borderColor: 'white',
      borderStyle: 'solid',
    }
  },

  Icon: {
    backgroundColor: colors.module,
    width: sizes.moduleView.icon,
    height: sizes.moduleView.icon,
    borderRadius: '10px',
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
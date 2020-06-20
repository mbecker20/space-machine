import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../theme/theme'

const useJSS = createUseStyles({
  Fill: {
    backgroundColor: colors.fillModule,
    display: 'grid',
    borderRadius: '15px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    minWidth: sizes.moduleView.iconGrid,
    maxWidth: '90%',
    minHeight: sizes.moduleView.iconGrid,
    maxHeight: '90%',
  },

  Mid: {
  
  },

  Icon: {
    backgroundColor: colors.module,
    width: sizes.moduleView.icon,
    height: sizes.moduleView.icon,
  },
})

export default useJSS
import { createUseStyles } from 'react-jss'
import { colors } from '../../../theme/theme'

const maxWidth = '8em'
const maxHeight = '12em'

const useJSS = createUseStyles({
  Bounder: {
    width: '100vw',
    height: '100vh',
    backgroundColor: '#00000026',
    position: 'absolute',
    top: 0,
    left: 0,
    maxHeight,
    overflowY: 'scroll'
  },

  ContextMenu: {
    display: 'flex',
    flexDirection: 'column',
  },

  MenuItem: {
    maxWidth,
    borderStyle: 'solid',
    borderColor: 'transparent',
    '&:hover': {
      borderColor: colors.contextMenuItemBorder
    }
  }
})

export default useJSS
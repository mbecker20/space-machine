import { createUseStyles } from 'react-jss'
import { colors } from '../../../theme/theme'

const maxWidth = '8em'
const maxHeight = '12em'

const useJSS = createUseStyles({
  Bounder: {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'transparent',
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    left: 0,
    zIndex: 1000,
  },

  ContextMenu: {
    maxHeight,
    backgroundColor: colors.contextMenuBackground,
    padding: '.2em .7em',
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    overflowY: 'scroll',
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
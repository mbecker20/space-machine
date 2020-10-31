import { createUseStyles } from 'react-jss'
import { colors } from '../../../theme/theme'
import { zIndex } from '../../../theme/zIndex'

const maxWidth = '8em'
const maxHeight = '12em'

const useJSS = createUseStyles({
  ContextMenuBounder: {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'transparent',
    position: 'fixed',
    overflow: 'hidden',
    top: 0,
    left: 0,
    zIndex: zIndex.contextMenu,
    opacity: 1,
    visibility: ({ isOpen }) => isOpen ? 'visible' : 'hidden'
  },

  ContextMenu: {
    maxHeight,
    backgroundColor: colors.contextMenuBackground,
    padding: '.2em',
    borderRadius: '.2em',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '0em',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
    },
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
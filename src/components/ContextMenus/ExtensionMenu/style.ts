import { createUseStyles } from 'react-jss'
import { colors } from '../../../theme/theme'

const maxWidth = '8em'
const maxHeight = '12em'

const useJSS = createUseStyles({
  ExtensionMenu: {
    maxHeight,
    maxWidth,
    backgroundColor: colors.contextMenuBackground,
    padding: '.2em',
    borderRadius: '.2em',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    top: -1000,
    left: -1000,
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '0em',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
    },
  },
})

export default useJSS
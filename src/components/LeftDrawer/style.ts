import { createUseStyles } from 'react-jss'
import { colors } from '../../theme/theme'

const useJSS = createUseStyles({
  LeftDrawer: {
    backgroundColor: colors.leftDrawer,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: 'calc(20px + 2vmin)',
    color: 'white',
    userSelect: 'none',
    zIndex: '1',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
    },
    overflowX: 'hidden',
    whiteSpace: 'nowrap'
  },
})

export default useJSS
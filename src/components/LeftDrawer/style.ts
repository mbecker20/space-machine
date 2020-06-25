import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../theme/theme'

const useJSS = createUseStyles({
  LeftDrawer: {
    backgroundColor: colors.leftDrawer,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 'calc(20px + 2vmin)',
    color: 'white',
    userSelect: 'none',
    zIndex: '1',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },

  TopItems: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    maxHeight: '50%',
    overflowX: 'hidden',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
    },
  },

  HeaderScrollBounder: {
    borderColor: 'white',
    borderStyle: 'none none solid none',
    '&::-webkit-scrollbar': {
      height: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
    },
  },

  DrawerHeader: {
    width: '100%',
    height: '1em',
    whiteSpace: 'nowrap',
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: sizes.text.large,
    padding: '1vmin 0vmin',
    borderColor: 'white',
    borderStyle: 'none none none none',
    borderWidth: '1px',
    display: 'flex',
    textAlign: 'center',
    justifyText: 'center',
    resize: 'none',
    overflow: 'hidden',
  },

  BottomItems: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    maxHeight: '50%',
    overflowX: 'hidden',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
    },
  },

  Delete: {
    backgroundColor: colors.deleteButton,
    color: colors.deleteButtonText,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: sizes.text.medium,
    width: '6em',
    height: '2em',
    '&:hover': {
      cursor: 'pointer',
    },
    borderRadius: '15px',
    margin: '15px',
  }
})

export default useJSS
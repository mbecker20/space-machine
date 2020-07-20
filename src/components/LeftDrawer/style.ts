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
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    zIndex: '20',
  },

  // TopItems

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

  //header

  HeaderScrollBounder: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
    borderWidth: '1px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    justifyText: 'center',
    resize: 'none',
    overflow: 'hidden',
    '&:hover': {
      cursor: 'pointer',
    },
  },

  MenuHeader: {
    fontSize: sizes.text.medium,
    borderStyle: 'none none solid none',
    margin: '1vmin',
    width: '90%'
  }, 

  Connection: {
    fontSize: sizes.text.small,
    backgroundColor: colors.fillModule,
    margin: '.5vmin 3vmin',
    borderRadius: '1vmin',
    borderColor: 'transparent',
    borderStyle: 'solid',
    minWidth: '30%',
    padding: '1vmin',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      cursor: 'pointer',
      borderColor: colors.deleteButton,
    },
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },

  //control menu (in the center of left drawer)

  ControlBounder: {
    display: 'flex',
    flexFlow: 'row wrap',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '1vmin',
    fontSize: sizes.text.small,
  },

  ControlMenu: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center'
  },

  // bottom items

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
})

export default useJSS
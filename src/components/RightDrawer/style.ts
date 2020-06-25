import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../theme/theme'

const useJSS = createUseStyles({
  DrawerBounder: {
    backgroundColor: colors.rightDrawer,
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: 'calc(20px + 2vmin)',
    color: 'white',
    position: 'absolute',
    top: '0px',
    userSelect: 'none',
    zIndex: '10',
  },

  Drawer: {
    height: '100vh',
    width: sizes.rightDrawer.width,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  // header

  DrawerHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: sizes.rightDrawer.width,
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      height: '3px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
    },
  },

  DrawerHeaderItem: {
    fontSize: 'calc(20px + 4vmin)',
    padding: '1vmin 1.5vmin',
    color: colors.text,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    '&:hover': {
      cursor: 'pointer',
    },
  },

  ItemRouter: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: sizes.rightDrawer.width,
    height: 'calc(100% - 60px)',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '1px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
    },
  },

  // Drawer items

  DrawerItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: '10px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    margin: '4vmin',
  },

  DrawerIcon: {
    backgroundColor: colors.grey,
    borderColor: colors.grey,
    borderStyle: 'solid',
    width: sizes.rightDrawer.item,
    height: sizes.rightDrawer.item,
    borderRadius: '1.5vmin',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    marginBottom: '1.5vmin',
    '&:hover': {
      cursor: 'pointer',
      borderColor: 'white',
    },
  },

  DrawerItemText: {
    fontSize: 'calc(10px + 2.5vmin)',
  },

  // toggle

  Toggle: {
    backgroundColor: colors.drawerToggle,
    width: sizes.rightDrawer.toggleWidth,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  },

  ToggleLine: {
    backgroundColor: colors.drawerToggleLine,
    width: '4px',
    height: '80px',
  },
})

export default useJSS
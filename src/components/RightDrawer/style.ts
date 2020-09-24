import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../theme/theme'

const useJSS = createUseStyles({
  DrawerBounder: {
    //backgroundColor: colors.rightDrawer,
    width: '0px',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: 'white',
    position: 'absolute',
    top: '0px',
    right: '0px',
    userSelect: 'none',
    zIndex: 10,
  },

  Drawer: {
    backgroundColor: colors.rightDrawer,
    height: '100vh',
    width: `${sizes.rightDrawer.width}px`,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: '0px',
    right: '0px',
    //overflow: 'hidden',
  },

  // header

  DrawerHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: 'inherit',
    overflowX: 'scroll',
    overflowY: 'hidden',
    '&::-webkit-scrollbar': {
      height: '3px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
    },
  },

  DrawerHeaderItem: {
    fontSize: sizes.text.medium,
    padding: '1vmin 1.5vmin',
    color: colors.text,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    '&:hover': {
      cursor: 'pointer',
    },
  },

  ItemRouter: {
    width: `${sizes.rightDrawer.width}px`,
    height: 'calc(100% - 60px)',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '0px',
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
    margin: '3vmin',
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
    fontSize: sizes.text.small,
  },

  // toggle

  Toggle: {
    backgroundColor: colors.drawerToggle,
    width: sizes.rightDrawer.toggleWidth,
    zIndex: 10,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
    position: 'absolute',
    top: '0px',
    right: `${sizes.rightDrawer.width}px`,
  },

  ToggleLine: {
    backgroundColor: colors.drawerToggleLine,
    borderRadius: '4px',
    width: '0.75vmin',
    height: '80px',
  },
})

export default useJSS
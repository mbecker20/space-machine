import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../theme/theme'

const useJSS = createUseStyles({
  DrawerBounder: {
    backgroundColor: colors.drawer,
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
  },

  Drawer: {
    height: '100vh',
    width: sizes.drawer.width,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  DrawerHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    fontSize: '25px',
    width: sizes.drawer.width,
    height: '60px',
    //borderColor: 'white',
    //borderStyle: 'none none solid none',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      height: '3px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
    },
  },

  DrawerHeaderItem: {
    padding: '10px',
    color: colors.text,
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    height: '30px',
  },

  ItemRouter: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    width: sizes.drawer.width,
    height: 'calc(100% - 60px)',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '1px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
    },
  },

  DrawerItem: {
    backgroundColor: colors.grey,
    width: sizes.drawer.item,
    height: sizes.drawer.item,
    borderRadius: '10px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    margin: '20px',
  },

  Toggle: {
    backgroundColor: colors.drawerToggle,
    width: sizes.drawer.toggleWidth,
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
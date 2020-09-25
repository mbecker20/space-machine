import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../../theme/theme'

const useJSS = createUseStyles({
  LeftBar: {
    width: sizes.addModuleMenu.leftBarWidth,
    //height: sizes.addModuleMenu.height,
    backgroundColor: colors.addModuleLeftBarBG,
  },

  LeftBarButton: {
    borderRadius: '0em',
    margin: '0em',
    backgroundColor: 'transparent',
    //borderStyle: 'none solid none none',
    borderColor: 'transparent',
    borderWidth: '1px',
    '&:hover': {
      borderColor: 'transparent',
    }
  },

  RouterBounder: {
    alignItems: 'center'
  },

  IconRouter: {
    width: sizes.addModuleMenu.iconRouterWidth,
    height: sizes.addModuleMenu.height,
    overflowY: 'scroll',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, auto)',
    gridAutoRows: '20vmin',
    gridAutoFlow: 'row',
    placeItems: 'center',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
    },
  },

  SearchBar: {
    width: '80%',
    height: '1.5em',
    marginTop: '1.4em',
    fontSize: sizes.text.small,
    backgroundColor: colors.addModuleSearchBarBG,
    color: colors.addModuleSearchBarText,
    textAlign: 'center',
    borderStyle: 'none',
    borderRadius: '.2em',
  },

  DrawerItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderRadius: '10px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
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
})

export default useJSS
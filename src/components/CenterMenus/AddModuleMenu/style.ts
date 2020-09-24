import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../../theme/theme'

const useJSS = createUseStyles({
  LeftBar: {
    width: '20vmin',
    height: '70vmin',
  },

  IconRouter: {
    width: '60vmin',
    height: '70vmin',
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
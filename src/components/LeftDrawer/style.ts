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

  ControlMenu: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center'
  },

  ControlBounder: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '1vmin',
    fontSize: sizes.text.small,
  },

  ControlInput: {
    minWidth: '9vmin',
    maxWidth: '5em',
    margin: '1vmin',
    fontSize: sizes.text.small
  },

  ControlTypeSelect: {
    minWidth: '9vmin',
    maxWidth: '5em',
    margin: '1vmin',
    fontSize: sizes.text.small
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

  // Center Menu

  CMInputBounder: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },

  CenterMenuInput: {
    backgroundColor: colors.grey,
    color: 'white',
    height: '2vmin',
    padding: '1vmin',
    margin: '1.5vmin .75vmin 1.5vmin 1.5vmin',
    borderStyle: 'none',
    borderRadius: '1vmin',
    fontSize: sizes.text.small,
    width: '23vmin',
    '&:hover': {
      cursor: 'text',
    },
  },

  InputSubmit: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.grey,
    height: '2vmin',
    padding: '1vmin',
    margin: '1.5vmin 1.5vmin 1.5vmin 0.75vmin',
    borderRadius: '1vmin',
    '&:hover': {
      cursor: 'pointer',
    },
    fontSize: sizes.text.small,
  },

  Error: {
    backgroundColor: colors.errorBackground,
    width: '90%',
    color: 'white',
    fontSize: sizes.text.small,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '1vmin',
    padding: '1vmin 0vmin',
    marginBottom: '1vmin',
  },
})

export default useJSS
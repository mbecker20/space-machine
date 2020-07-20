import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../../theme/theme'

const useJSS = createUseStyles({

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
    flexFlow: 'row wrap',
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
})

export default useJSS
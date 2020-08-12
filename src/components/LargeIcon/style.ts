import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../theme/theme'

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

  ControlBounder: {
    display: 'flex',
    flexFlow: 'row wrap',
    //justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: sizes.text.small,
    justifyContent: 'center',
    margin: '0vmin 1vmin'
  },

  ControlMenu: {
    display: 'flex',
    flexFlow: 'row wrap',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default useJSS
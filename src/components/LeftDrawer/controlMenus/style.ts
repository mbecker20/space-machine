import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../../theme/theme'

const useJSS = createUseStyles({
  MenuBounder: {
    marginTop: '3vmin',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  SubMenuHeader: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: sizes.text.medium,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    padding: '1vmin',
    borderStyle: 'none none solid none',
  },

  MenuButton: {
    backgroundColor: colors.grey,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '1vmin',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    padding: '1vmin 1.5vmin 2vmin 1.5vmin',
    height: '.9em',
    margin: '1vmin',
    '&:hover': {
      cursor: 'pointer',
    },
  }
})

export default useJSS
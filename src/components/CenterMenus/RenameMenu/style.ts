import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../../theme/theme'

const useJSS = createUseStyles({
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
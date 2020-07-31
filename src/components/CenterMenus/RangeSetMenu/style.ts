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
    width: '15vmin',
    '&:hover': {
      cursor: 'text',
    },
  },
})

export default useJSS
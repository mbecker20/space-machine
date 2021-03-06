import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../../theme/theme'

const useJSS = createUseStyles({
  Connection: {
    fontSize: sizes.text.xsmall,
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

  MenuHeader: {
    fontSize: sizes.text.small,
    borderStyle: 'none none solid none',
    margin: '1vmin',
    width: '90%'
  },

  OpenButton: {
    fontSize: sizes.text.small,

  },
})

export default useJSS
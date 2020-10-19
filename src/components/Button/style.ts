import { createUseStyles } from 'react-jss'
import { colors } from '../../theme/theme'

const useJSS = createUseStyles({
  Button: {
    backgroundColor: colors.defaultButton,
    borderColor: 'transparent',
    borderRadius: '1vmin',
    borderStyle: 'solid',
    '&:active': {
      borderColor: 'transparent',
    },
    '&:hover': {
      cursor: ({ notClickable }) => notClickable ? '' : 'pointer',
      borderColor: ({ notClickable }) => notClickable ? 'transparent' : 'white',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '.4em',
    margin: '.3em',
    textAlign: 'center',
    fontSize: ({ fontSize }) => fontSize,
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },
})

export default useJSS
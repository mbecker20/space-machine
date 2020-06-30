import { createUseStyles } from 'react-jss'
//import { colors } from '../../theme/theme'

const useJSS = createUseStyles({
  TestingArea: {
    backgroundColor: 'black',
    position: 'absolute',
    top: '45vh',
    left: '25vw',
    width: '45vw',
    height: '50vh',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 150,
  },

  ButtonDiv: {
    display: 'flex',
    flexFlow: 'row wrap',
  },

  Button: {
    margin: '2vmin',
    padding: '1vmin',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover': {
      cursor: 'pointer',
    },
  }
})

export default useJSS
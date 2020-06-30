import { createUseStyles } from 'react-jss'
//import { colors } from '../../theme/theme'

const useJSS = createUseStyles({
  TestingArea: {
    backgroundColor: 'black',
    position: 'absolute',
    top: '50vh',
    left: '30vw',
    width: '40vw',
    height: '40vh',
    display: 'flex',
    flexDirection: 'column',
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
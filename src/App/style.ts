import { createUseStyles } from 'react-jss'
//import { colors } from '../theme/theme'

const useJSS = createUseStyles({
  Bounder: {
    //backgroundColor: colors.grey,
    backgroundImage: 'url(https://media.wired.com/photos/5a593a7ff11e325008172bc2/master/pass/pulsar-831502910.jpg)',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    fontSize: 'calc(20px + 2vmin)',
    color: 'white',
    position: 'absolute',
    top: '0px',
    left: '0px',
    userSelect: 'none',
    zIndex: '-1',
    overflow: 'hidden',
  },

  ModuleViewBounder: {
    minWidth: '60vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    zIndex: 0,
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      width: '0px',
    },
  }
})

export default useJSS
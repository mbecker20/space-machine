import { createUseStyles } from 'react-jss'
//import { colors, sizes } from '../../theme/theme'

const useJSS = createUseStyles({
  PointerLayer: {
    width: '100vw',
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 300,
  },
})

export default useJSS
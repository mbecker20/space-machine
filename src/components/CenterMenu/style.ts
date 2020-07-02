import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../theme/theme'

const useJSS = createUseStyles({
  CenterMenuBounder: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: 200,
  },

  CenterMenu: {
    backgroundColor: colors.centerMenu,
    position: 'absolute',
    top: '50vh',
    left: '50vw',
    transform: 'translate(-50%, calc(-50% - 50px))',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: '2vmin',
    zIndex: 20,
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  },

  Header: {
    padding: '1vmin 2vmin',
    borderColor: 'white',
    borderStyle: 'none none solid none',
    fontSize: sizes.text.large,
  },
})

export default useJSS
import { createUseStyles } from 'react-jss'
import { sizes } from '../../theme/theme'

const useJSS = createUseStyles({
  Notification: {
    position: 'absolute',
    top: '10vh',
    left: '50vw',
    transform: 'translate(-50%, 0%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2vmin',
    borderRadius: '4vmin',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    zIndex: 1000,
    fontSize: sizes.text.small
  }
})

export default useJSS
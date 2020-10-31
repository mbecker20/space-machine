import { createUseStyles } from 'react-jss'
import { sizes } from '../../../../theme/theme'

const useJSS = createUseStyles({
  ModuleIcon: {
    width: sizes.moduleView.icon,
    height: sizes.moduleView.icon,
    borderRadius: '1.5vmin',
    borderStyle: 'none',
    borderColor: 'white',
    whiteSpace: 'wrap',
    fontSize: sizes.text.small,
    padding: '1vmin',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    overflow: 'hidden',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
  }
})

export default useJSS
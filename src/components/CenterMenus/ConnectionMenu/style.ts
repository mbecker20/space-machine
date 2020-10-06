import { createUseStyles } from 'react-jss'
import { sizes } from '../../../theme/theme'

const indent = '2vmin'

const useJSS = createUseStyles({
  IORecursionBounder: {
    display: 'flex',
    alignSelf: 'flex-start',
    marginLeft: '5vmin',
    flexDirection: 'column',
    alignItems: 'flex-start',
    height: '60vmin',
    width: '90%',
    overflowY: 'scroll',
    overflowX: 'visible',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
      borderRadius: '2px'
    },
  },
  IORecursionInnerBounder: {
    display: 'flex',
    alignSelf: 'flex-start',
    marginLeft: indent,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  ModuleIcon: {
    borderRadius: '1.5vmin',
    borderStyle: 'none',
    borderColor: 'white',
    whiteSpace: 'wrap',
    fontSize: sizes.text.medium,
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
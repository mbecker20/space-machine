import { createUseStyles } from 'react-jss'

const indent = '2vmin'

const useJSS = createUseStyles({
  IORecursionBounder: {
    display: 'flex',
    alignSelf: 'flex-start',
    flexDirection: 'column',
    alignItems: 'flex-start',
    //width: '90%',
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
})

export default useJSS
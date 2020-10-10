import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../../../theme/theme'

const useJSS = createUseStyles({
  Module: {
    borderRadius: '1.5vmin',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    //maxHeight: '30vmin',
    //minHeight: '20vmin',
    flexGrow: 1,
    flexShrink: 1,
    //overflowY: 'scroll',
    //overflowX: 'visible',
    '&::-webkit-scrollbar': {
      width: '0px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
    },
    padding: '.2em .5em',
  },

  ChildBounder: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridAutoRows: 'auto',
    gridAutoFlow: 'row',
    gap: '.2em'
  },

  IconConnector: {
    backgroundColor: colors.outputConnector,
    width: sizes.connector.size,
    height: sizes.connector.size,
    borderRadius: sizes.connector.borderRadius,
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    borderStyle: 'solid',
    borderColor: 'transparent',
    '&:hover': {
      cursor: 'pointer',
      borderColor: 'white',
    },
  },

  ConnectorBounder: {
    alignItems: 'center',
  },

  Name: {
    whiteSpace: 'noWrap',
    fontSize: sizes.text.medium
  },

  ConnectorName: {
    whiteSpace: 'noWrap',
    fontSize: sizes.text.small
  },

  ParamName: {
    whiteSpace: 'noWrap',
    fontSize: sizes.text.small
  },

  ConnectionReciever: {

  },

  SmallConnectionReciever: {

  }
})

export default useJSS
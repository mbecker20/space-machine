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
    //borderStyle: 'solid',
    //borderColor: colors.grey,
  },

  ChildBounder: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridAutoRows: 'auto',
    gridAutoFlow: 'row',
    gap: '.2em',
    justifyItems: 'center',
    //alignItems: 'start',
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
    fontSize: sizes.text.medium,
    marginBottom: '.2em',
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
    backgroundColor: 'black',
    width: sizes.connector.size,
    height: sizes.connector.size,
    borderRadius: sizes.connector.borderRadius,
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    borderStyle: 'solid',
    borderColor: colors.moduleInput,
    borderWidth: '.25em'
  },

  SmallConnectionReciever: {
    backgroundColor: 'black',
    width: sizes.connector.smallSize,
    height: sizes.connector.smallSize,
    borderRadius: sizes.connector.smallBorderRadius,
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    borderStyle: 'solid',
    borderColor: colors.paramInput,
    borderWidth: '.2em',
  }
})

export default useJSS
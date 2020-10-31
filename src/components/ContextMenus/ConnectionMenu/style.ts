import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../../theme/theme'

const useJSS = createUseStyles({
  Module: {
    borderRadius: '1.5vmin',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 1,
    '&::-webkit-scrollbar': {
      width: '0px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
    },
    padding: '.2em .5em',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
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
    '&:hover': {
      cursor: 'pointer',
    },
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
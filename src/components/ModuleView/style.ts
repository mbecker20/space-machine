import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../theme/theme'

const useJSS = createUseStyles({
  FillBounder: {
    backgroundColor: colors.fillModule,
    display: 'flex',
    flexDirection: 'column',
    margin: '5vmin',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    borderRadius: '2vmin',
  },

  FillHeaderBounder: {
    display: 'flex',
    
  },

  FillHeader: {
    borderColor: 'white',
    borderStyle: 'none none solid none',
    padding: '1vmin',
    marginLeft: '2vmin',
    '&:hover': {
      cursor: 'pointer'
    }
  },

  Fill: {
    display: 'grid',
    minWidth: sizes.moduleView.iconGrid,
    minHeight: sizes.moduleView.iconGrid,
    alignItems: 'center',
    justifyItems: 'center',
    padding: '2vmin',
    zIndex: 1,
  },

  ArcherContainer: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    display: 'grid',
  },

  Icon: {
    backgroundColor: colors.module,
    width: sizes.moduleView.icon,
    height: sizes.moduleView.icon,
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
    '&:hover': {
      cursor: 'pointer',
      borderStyle: 'solid',
    },
    zIndex: 2,
  },

  IconName: {
    fontSize: sizes.text.small,
  },

  IconConnector: {
    backgroundColor: colors.outputConnector,
    width: sizes.connector.size,
    height: sizes.connector.size,
    borderRadius: sizes.connector.borderRadius,
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    borderStyle: 'none',
    borderColor: 'white',
    '&:hover': {
      cursor: 'pointer',
      borderStyle: 'solid',
    },
  },
})

export default useJSS
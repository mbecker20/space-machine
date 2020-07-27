import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../theme/theme'
//import sineSVG from '../../icons/oscIcons/sine2.svg'

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
    justifyContent: 'space-between',
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
    //alignItems: 'center',
    //justifyItems: 'center',
    padding: '4vmin',
    zIndex: 1,
    rowGap: sizes.moduleView.gutterGrid,
    columnGap: sizes.moduleView.gutterGrid,
  },

  ArcherContainer: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    display: 'grid',
  },

  Icon: {
    backgroundColor: colors.module,
    //backgroundImage: `url(${sineSVG})`,
    //backgroundSize: 'contain',
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

  ArcherElement: {
    zIndex: 1,
    display: 'grid',
    gridTemplateRows: '10px auto 10px',
    gridTemplateColumns: '10px auto 10px',
    padding: '1vmin'
  },

  IconName: {
    fontSize: sizes.text.small,
    '&:hover': {
      cursor: 'pointer',
    }
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
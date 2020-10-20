import { createUseStyles } from 'react-jss'
import { colors, sizes } from '../../../theme/theme'

const useJSS = createUseStyles({
  LeftBar: {
    width: sizes.addModuleMenu.leftBarWidth,
    //height: sizes.addModuleMenu.height,
    backgroundColor: colors.addModuleLeftBarBG,
  },

  LeftBarButton: {
    borderRadius: '0em',
    margin: '0em',
    backgroundColor: 'transparent',
    //borderStyle: 'none solid none none',
    borderColor: 'transparent',
    borderWidth: '1px',
    '&:hover': {
      borderColor: 'transparent',
    }
  },

  RouterBounder: {
    alignItems: 'center'
  },

  IconRouter: {
    width: sizes.addModuleMenu.iconRouterWidth,
    height: sizes.addModuleMenu.height,
    overflowY: 'scroll',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, auto)',
    gridAutoRows: '20vmin',
    gridAutoFlow: 'row',
    placeItems: 'center',
    '&::-webkit-scrollbar': {
      width: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'white',
    },
  },

  SearchBar: {
    width: '80%',
    height: '1.5em',
    marginTop: '1.3em',
    marginBottom: '.4em',
    fontSize: sizes.text.small,
    backgroundColor: colors.addModuleSearchBarBG,
    color: colors.addModuleSearchBarText,
    textAlign: 'center',
    borderStyle: 'none',
    borderRadius: '.2em',
    '&:focus': {
      outline: 'none',
    }
  },
})

export default useJSS
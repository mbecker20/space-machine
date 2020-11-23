import { createUseStyles } from 'react-jss'
import { sizes } from '../../theme/theme'

const useJSS = createUseStyles({
  MenuHeader: {
    fontSize: sizes.text.medium,
    borderStyle: 'none none solid none',
    margin: '1vmin',
    width: '90%'
  }, 

  ControlBounder: {
    display: 'flex',
    flexFlow: 'row wrap',
    //justifyContent: 'space-around',
    alignItems: 'center',
    fontSize: sizes.text.small,
    justifyContent: 'center',
    margin: '.2em'
  },

  ControlMenu: {
    display: 'flex',
    flexFlow: 'row wrap',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default useJSS
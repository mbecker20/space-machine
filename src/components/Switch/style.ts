import {createUseStyles} from 'react-jss'

const useJSS = createUseStyles({
  Bounder: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '15px',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    userSelect: 'none',
    margin: '10px',
    '&:hover': {
      cursor: 'pointer'
    },
    padding: '1vmin',
  },

  SwitchSVG: {
    marginLeft: '1.5vmin',
    flexShrink: 0,
    //padding: '.5vmin',
  },

  Text: {
    fontSize: ({ fontSize }) => fontSize,
  }
})

export default useJSS;
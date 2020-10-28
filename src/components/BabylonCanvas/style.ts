import { createUseStyles } from 'react-jss'

const useJSS = createUseStyles({
  BabylonCanvas: {
    width: ({ width }) => width,
    height: ({ height }) => height
  },
})

export default useJSS
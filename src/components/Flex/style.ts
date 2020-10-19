import { createUseStyles } from 'react-jss'

const useJSS = createUseStyles({
  FlexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: ({ justifyContent }) => justifyContent,
    alignItems: ({ alignItems }) => alignItems,
    flexWrap: ({ flexWrap }) => flexWrap,
  },

  FlexCol: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: ({ justifyContent }) => justifyContent,
    alignItems: ({ alignItems }) => alignItems,
  }
})

export default useJSS
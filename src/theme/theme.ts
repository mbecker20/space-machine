import { Colors, Sizes } from './types'

const grey = '#282c34' // grey
const secondary = '#281c34' //purple
const tertiary = '#182c54' // blue

export const colors: Colors = {
  grey: grey,
  secondary: secondary,
  tertiary: tertiary,

  rightDrawer: '#0000009e',
  drawerToggle: '#00347d',
  drawerToggleLine: '#001b40',

  leftDrawer: '#0000009e',

  centerMenu: 'black',

  fillModule: '#c0c0c038',
  module: '#37538a',

  text: 'white',
  selectedText: '#007ab3',

  dropSquareHL: 'white',

  defaultButton: 'black',
  deleteButton: '#cc00006e',
  deleteButtonText: 'white',

  errorBackground: '#cc0000',

  outputConnector: 'red',

  controlMenuButton: '#3b3b3b94'
}

export const sizes: Sizes = {
  rightDrawer: {
    width: '21vw',
    toggleWidth: '1.5vmin',
    item: '10vmin'
  },
  leftDrawer: {
    width: '20vw',
  },
  moduleView: {
    iconGrid: '12vmin',
    gutterGrid: '6vmin',
    icon: '9vmin',
    bigIcon: '27vmin',
  },
  text: {
    large: 'calc(25px + 2.8vmin)',
    medium: 'calc(20px + 2.4vmin)',
    small: 'calc(12px + 1.4vmin)',
    xsmall: 'calc(8px + 1vmin)',
  },
  connector: {
    size: '3vmin',
    borderRadius: '1.5vmin'
  },
}
import { Colors, Sizes } from './types'

const grey = '#282c34' // grey
const secondary = '#281c34' //purple
const tertiary = '#182c54' // blue

export const colors: Colors = {
  grey: grey,
  secondary: secondary,
  tertiary: tertiary,

  rightDrawer: 'black',
  drawerToggle: '#00347d',
  drawerToggleLine: '#001b40',

  leftDrawer: 'black',

  centerMenu: 'black',

  fillModule: '#1b1e24',
  module: '#37538a',

  text: 'white',
  selectedText: '#007ab3',

  dropSquareHL: 'white',

  defaultButton: 'black',
  deleteButton: '#cc0000',
  deleteButtonText: 'white',

  errorBackground: '#cc0000',

  outputConnector: 'red',
}

export const sizes: Sizes = {
  rightDrawer: {
    width: '25vw',
    toggleWidth: '1.5vmin',
    item: '10vmin'
  },
  leftDrawer: {
    width: '20vw',
  },
  moduleView: {
    iconGrid: '14vmin',
    gutterGrid: '4vmin',
    icon: '10vmin',
  },
  text: {
    large: 'calc(20px + 2.5vmin)',
    medium: 'calc(15px + 1.5vmin)',
    small: 'calc(10px + 1.3vmin)',
  },
  connector: {
    size: '3vmin',
    borderRadius: '1.5vmin'
  },
}
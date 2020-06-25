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

  fillModule: '#1b1e24',
  module: '#37538a',

  text: 'white',
  selectedText: '#007ab3',

  dropSquareHL: 'white',

  deleteButton: '#cc0000',
  deleteButtonText: 'white',
}

export const sizes: Sizes = {
  rightDrawer: {
    width: '25vw',
    toggleWidth: '1.5vmin',
    item: '10vmin'
  },
  leftDrawer: {
    width: '25vw',
  },
  moduleView: {
    iconGrid: '14vmin',
    gutterGrid: '4vmin',
    icon: '12vmin',
  }
}
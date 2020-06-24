import { Colors, Sizes } from './types'

const grey = '#282c34' // grey
const secondary = '#281c34' //purple
const tertiary = '#182c54' // blue

export const colors: Colors = {
  grey: grey,
  secondary: secondary,
  tertiary: tertiary,

  drawer: 'black',
  drawerToggle: '#00347d',
  drawerToggleLine: '#001b40',

  fillModule: '#1b1e24',
  module: '#37538a',

  text: 'white',
  selectedText: '#007ab3',

  dropSquareHL: 'white',
}

export const sizes: Sizes = {
  drawer: {
    width: '300px',
    toggleWidth: '15px',
    item: '80px'
  },
  moduleView: {
    iconGrid: '15vmin',
    gutterGrid: '5vmin',
    icon: '13vmin',
  }
}
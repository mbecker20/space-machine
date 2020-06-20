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
  module: '#1b1e24',

  text: 'white',
  selectedText: '#007ab3',
}

export const sizes: Sizes = {
  drawer: {
    width: '400px',
    toggleWidth: '15px',
    item: '80px'
  },
  moduleView: {
    iconGrid: '15vmin',
    gutterGrid: '5vmin',
    icon: '14vmin',
  }
}
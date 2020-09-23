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

  centerMenu: 'black',

  fillModule: '#c0c0c038',
  module: '#37538a',

  text: 'white',
  selectedText: '#007ab3',

  dropSquareHL: '#ffffff60',

  defaultButton: 'black',
  deleteButton: '#cc00006e',
  deleteButtonText: 'white',

  errorBackground: '#cc0000',

  outputConnector: 'red',

  controlMenuButton: '#3b3b3b94',

  //knob: '#ffffffa3',
  knob: '#0000009e',
  knobText: 'white',
  knobBorder: '#cc00006e',
  knobMarker: 'white',

  // connection menu
  connectableName: 'white',
  expandableName: '#85adad',

  // module colors

  sourceModuleBG: '#028174',
  //sourceModuleKnob

  effectsModuleBG: '#7D1551',
  //effectsModukeKnob

  containerModuleBG: '#4C4141',
  //container knob magic tricks

  outputModuleBG: '#CA5F3C',

  analyzerModuleBG: '#00347D',

  confirmButton: '#00802da6',
  denyButton: '#cc00006e',

  // Context menu
  contextMenuItemBorder: 'black',
  contextMenuBackground: '#08101deb',

  sdbSaveButton: '#282c349c',
}

export const sizes: Sizes = {
  rightDrawer: {
    width: '400px',
    toggleWidth: '2vmin',
    item: '9vmin',
  },
  moduleView: {
    iconGrid: '12vmin',
    gutterGrid: '6vmin',
    icon: '10vmin',
    bigIconWidth: '25vmin',
    bigIconHeight: '35vmin',
  },
  text: {
    large: 'calc(25px + 2.8vmin)',
    medium: 'calc(20px + 2.4vmin)',
    small: 'calc(12px + 1.2vmin)',
    xsmall: 'calc(8px + 1vmin)',
    xxsmall: 'calc(7px + .8vmin)',
  },
  connector: {
    size: '2.5vmin',
    borderRadius: '1.5vmin'
  },
  knob: {
    size: 7, // converted to vmin in knob
    markerWidth: .5,
    markerHeight: 1.3,
    rotRange: [-150, 150], // in degrees
    sensitivity: 1,
    borderWidth: 8,
  },
  switch: {
    diameter: 3 // in vmin
  },
}
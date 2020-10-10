export interface Colors {
  [index: string]: string
}

interface Drawer {
  [index: string]: string
}

interface ModuleView {
  [index: string]: string
}

interface Text {
  large: string
  medium: string
  small: string
  xsmall: string
  xxsmall: string
}

interface Connector {
  size: string
  borderRadius: string
  smallSize: string
  smallBorderRadius: string
}

interface Knob {
  size: number // converted to vmin
  markerWidth: number
  markerHeight: number
  rotRange: [number, number] // in degrees
  sensitivity: number
  borderWidth: number
}

interface Switch {
  diameter: number // in vmin
}

interface AddModuleMenu {
  leftBarWidth: string
  iconRouterWidth: string
  height: string
}

export interface Sizes {
  rightDrawer: Drawer
  moduleView: ModuleView
  text: Text
  connector: Connector
  knob: Knob
  switch: Switch
  addModuleMenu: AddModuleMenu
}




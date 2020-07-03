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
}

interface Connector {
  size: string
  borderRadius: string
}

export interface Sizes {
  rightDrawer: Drawer
  leftDrawer: Drawer
  moduleView: ModuleView
  text: Text
  connector: Connector
}
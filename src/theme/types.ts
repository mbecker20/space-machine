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
}

export interface Sizes {
  rightDrawer: Drawer
  leftDrawer: Drawer
  moduleView: ModuleView
  text: Text
}
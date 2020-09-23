import { MouseEvent } from "react"

export type MouseDivEvent = MouseEvent<HTMLDivElement>

export interface ContextMenuBaseProps {
  event: MouseDivEvent
  onClose: () => void
}

export interface ModuleContextMenuData {
  isOpen: boolean
  event?: MouseDivEvent
  modID?: string
}

export interface SDBProjectContextMenuData {
  isOpen: boolean
  event?: MouseDivEvent
  saveName?: string
  setSaveList?: (arg: string[]) => void
}
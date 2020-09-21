import { MouseEvent } from "react";

export interface ModuleContextMenuData {
  isOpen: boolean
  event: MouseEvent<HTMLDivElement> | null
  modID: string | null
}
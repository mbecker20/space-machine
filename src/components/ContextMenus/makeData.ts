import { ModuleContextMenuData, MouseDivEvent, SDBProjectContextMenuData } from "./types";

export function makeModuleCMData(isOpen: boolean, event?: MouseDivEvent, modID?: string): ModuleContextMenuData {
  return {
    isOpen,
    event,
    modID,
  }
}

export function makeSDBProjectCMData(
  isOpen: boolean, 
  event?: MouseDivEvent, 
  saveName?: string, 
  setSaveList?: (arg: string[]) => void
): SDBProjectContextMenuData {
  return {
    isOpen,
    event,
    saveName,
    setSaveList
  }
}
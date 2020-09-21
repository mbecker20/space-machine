import { MouseEvent } from "react";
import { ModuleContextMenuData } from "./types";

export function makeModuleCMData(isOpen: boolean, event: MouseEvent<HTMLDivElement> | null = null, modID: string | null = null): ModuleContextMenuData {
  return {
    isOpen,
    event,
    modID,
  }
}
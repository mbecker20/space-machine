import { MouseEvent } from "react";
import { Module } from "../../redux/stateTSTypes";
import { ModuleContextMenuData } from "./types";

export function makeModuleCMData(isOpen: boolean, event: MouseEvent<HTMLDivElement> | null = null, selectedModule: Module | null = null): ModuleContextMenuData {
  return {
    isOpen,
    event,
    selectedModule,
  }
}
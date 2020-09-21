import { MouseEvent } from "react";
import { Module } from "../../redux/stateTSTypes";

export interface ModuleContextMenuData {
  isOpen: boolean
  event: MouseEvent<HTMLDivElement> | null
  selectedModule: Module | null
}
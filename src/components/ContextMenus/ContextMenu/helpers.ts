import { DragEvent, RefObject } from "react";
import { MouseDivEvent } from "../types";

export type DivRef = RefObject<HTMLDivElement>

export function getCMLocation(e: MouseDivEvent | DragEvent<HTMLDivElement>, ref: DivRef) {
  if (!ref.current) {
    return {
      top: -1000,
      left: -1000,
    }
  } else {
    return {
      top: (window.innerHeight - e.pageY) >= ref.current.offsetHeight ?
        e.pageY : window.innerHeight - ref.current.offsetHeight,
      left: (window.innerWidth - e.pageX) >= ref.current.offsetWidth ?
        e.pageX : window.innerWidth - ref.current.offsetWidth,
    }
  }
}
import { DragEvent, RefObject } from "react";
import { MouseDivEvent } from "../types";

export function getLocation(e: MouseDivEvent | DragEvent<HTMLDivElement>, ref: RefObject<HTMLDivElement>) {
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
import { inRange } from "../../../helpers/genFuncs"
import { DivRef } from "../ContextMenu/helpers"
import { MouseDivEvent } from "../types"

export function getEMLocation(buttonRef: DivRef, menuRef: DivRef) {
  if (!buttonRef.current || !menuRef.current) {
    return {
      top: -1000,
      left: -1000,
    }
  } else {
    const buttonVertPos = buttonRef.current.getBoundingClientRect().top
    const CMHorizPos = buttonRef.current.parentElement?.getBoundingClientRect().left as number
    const CMWidth = buttonRef.current.parentElement?.offsetWidth as number
    const EMHeight = menuRef.current.offsetHeight // extension menu 
    const EMWidth = menuRef.current.offsetWidth
    return {
      top: (window.innerHeight - buttonVertPos) >= EMHeight ?
        buttonVertPos : window.innerHeight - EMHeight,
      left: (window.innerWidth - CMHorizPos - CMWidth) >= EMWidth ?
        CMHorizPos + CMWidth : CMHorizPos - EMWidth
    }
  }
}

export function mouseInDiv(e: MouseDivEvent, ref: DivRef) {
  if (ref.current) {
    const { top, left, bottom, right } = ref.current.getBoundingClientRect()
    console.log(left, right)
    console.log(e.screenX)
    console.log(inRange(e.screenX, [left, right]))
    return inRange(e.pageX, [left, right]) && inRange(e.pageY, [top, bottom])
  } else {
    return false
  }
}
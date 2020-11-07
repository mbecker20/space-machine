import { DivRef } from "../ContextMenu/helpers"

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
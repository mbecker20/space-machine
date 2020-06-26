import React, { useState, useRef } from 'react'
import { animated, useSpring } from 'react-spring'
import useJSS from './style'
import { sizes } from '../../theme/theme'
import { useDispatch } from 'react-redux'
import { removeContainer, renameContainer } from '../../redux/allActions'
import { HorizontalScrollDiv, CenterMenu } from '../all'

declare global {
  interface Window { 
    setLeftDrawerOpen: (isOpen: boolean) => void 
    setLeftDrawerTopText: (text: string) => void 
  }
}

interface Props {

}

function LeftDrawer() {
  const classes = useJSS()
  const [isOpen, setOpen] = useState(false)
  window.setLeftDrawerOpen = setOpen
  const [topText, setTopText] = useState(window.highlightedID)
  window.setLeftDrawerTopText = setTopText
  const springStyle = useSpring({
    width: isOpen ? sizes.leftDrawer.width : '0vw',
    config: {
      tension: 300,
      velocity: 10,
      clamp: true,
    }
  })
  const dispatch = useDispatch()
  const [isRenameMenuOpen, setRMOpen] = useState(false)
  const renameInputRef = useRef<HTMLInputElement>(null)
  return (
    <React.Fragment>
      <animated.div className={classes.LeftDrawer} style={springStyle}>
        <div className={classes.TopItems}>
          <HorizontalScrollDiv className={classes.HeaderScrollBounder}>
            <div className={classes.DrawerHeader} onClick={() => {
              setRMOpen(true)
            }}>
              {topText}
            </div>
          </HorizontalScrollDiv>
        </div>
        <div className={classes.BottomItems}>
          <div className={classes.Delete}
            onClick={() => {
              window.setLeftDrawerOpen(false)
              dispatch(removeContainer(window.highlightedID))
              window.highlightedID = ''
            }}
          >delete</div>
        </div>
      </animated.div>
      {!isRenameMenuOpen ? null :
      <CenterMenu header='rename' onClose={() => setRMOpen(false)}>
        <div className={classes.CMInputBounder}>
          <input className={classes.CenterMenuInput}
            placeholder={window.highlightedID}
            onChange={(e) => {
              e.preventDefault()
            }}
            onKeyUp={event => {
              if (renameInputRef && renameInputRef.current) {
                if (event.keyCode === 13) {
                  event.preventDefault()
                  dispatch(renameContainer(window.highlightedID, renameInputRef.current.value))
                  setRMOpen(false)
                  window.highlightedID = renameInputRef.current.value
                  setTopText(renameInputRef.current.value)
                }
              }
            }}
            ref={renameInputRef}
            autoFocus
          />
          <div className={classes.InputSubmit}
            onClick={() => {
              if (renameInputRef && renameInputRef.current) {
                dispatch(renameContainer(window.highlightedID, renameInputRef.current.value))
                setRMOpen(false)
                window.highlightedID = renameInputRef.current.value
                setTopText(renameInputRef.current.value)
              }
            }}
          >enter</div>
        </div>
      </CenterMenu>}
    </React.Fragment>
  )
}

export default LeftDrawer
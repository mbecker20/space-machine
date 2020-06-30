import React, { useState } from 'react'
import { animated, useSpring } from 'react-spring'
import useJSS from './style'
import { sizes } from '../../theme/theme'
import { useDispatch } from 'react-redux'
import { removeModule } from '../../redux/allActions'
import { HorizontalScrollDiv } from '../all'
import RenameMenu from './RenameMenu'

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
  const [isOpen, setOpen] = useState(true)
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
              dispatch(removeModule(window.highlightedID))
              window.highlightedID = ''
            }}
          >delete</div>
        </div>
      </animated.div>
      {!isRenameMenuOpen ? null :
      <RenameMenu setRMOpen={setRMOpen} setTopText={setTopText}/>}
    </React.Fragment>
  )
}

export default LeftDrawer
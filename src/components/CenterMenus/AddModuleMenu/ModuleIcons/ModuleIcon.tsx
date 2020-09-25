import React from 'react'
import { useDispatch } from 'react-redux'
import { ModuleType } from '../../../../audioModules/moduleTypes'
import genRandomID from '../../../../redux/idGen'
import { ADD_MODULE } from '../../../../redux/modules/moduleActionTypes'
import getModuleColor from '../../../../theme/moduleColor'
import { colors } from '../../../../theme/theme'
import useJSS from '../style'

interface Props {
  fullName: string
  shortName: string
  moduleType: string
  isFocussed?: boolean
  totNumModules: number
  row: number
  col: number
  onClose: () => void
}

function ModuleIcon({ fullName, shortName, moduleType, isFocussed, totNumModules, row, col, onClose }: Props) {
  const classes = useJSS()
  const dispatch = useDispatch()
  function addModule() {
    window.addModule(
      genRandomID(0, totNumModules),
      shortName,
      window.fillContainerID,
      moduleType as ModuleType,
      dispatch,
      row, col
    )
    onClose()
  }
  if (isFocussed) {
    window.addSelectedSearchModule = addModule
  }
  return (
    <div className={classes.DrawerItem}>
      <div className={classes.DrawerIcon}
        style={{ 
          backgroundColor: getModuleColor(moduleType),
          borderColor: isFocussed ? 'white' : colors.grey
        }}
        onFocus={e => { 
          e.preventDefault()
          console.log('focussing 2')
        }}
        onClick={addModule}
        draggable={true}
        onDragStart={event => { // but the div disappears making this not work
          event.persist()
          event.dataTransfer.setData('type', ADD_MODULE)
          event.dataTransfer.setData('id', genRandomID(0, totNumModules))
          event.dataTransfer.setData('moduleType', moduleType)
          event.dataTransfer.setData('name', shortName)
          //onClose()
        }}
        onKeyDown={e => {
          switch (e.key) {
            case 'Enter': addModule()
          }
        }}
      />
      <div className={classes.DrawerItemText}>
        {fullName}
      </div>
    </div>
  )
}

export default ModuleIcon
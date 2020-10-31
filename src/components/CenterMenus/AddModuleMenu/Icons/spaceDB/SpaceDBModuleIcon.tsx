import React from 'react'
import { useDispatch } from 'react-redux'
import { CONTAINER } from '../../../../../audioModules/moduleTypes'
import { performContainerMerge } from '../../../../../redux/replicateContainer'
import getModuleColor from '../../../../../theme/moduleColor'
import { colors } from '../../../../../theme/theme'
import useJSS from '../style'

interface Props {
  moduleName: string
  totNumberModules: number
  totNumberConnections: number
  onClose: () => void
  row: number
  col: number
  isFocussed?: boolean
}

function SpaceDBModuleIcon({ moduleName, totNumberModules, totNumberConnections, onClose, row, col, isFocussed }: Props) {
  const classes = useJSS()
  const dispatch = useDispatch()
  function addModule() {
    window.containerSaveService.get(moduleName).then(({ containerID, modules, connections }: any) => {
      performContainerMerge(dispatch, modules, connections, totNumberModules, totNumberConnections, window.fillContainerID, containerID, row, col)
    })
    onClose()
  }
  if (isFocussed) {
    window.addSelectedSearchModule = addModule
  }
  return (
    <div className={classes.DrawerItem}>
      <div className={classes.DrawerIcon}
        style={{ 
          backgroundColor: getModuleColor(CONTAINER),
          borderColor: isFocussed ? 'white' : colors.grey,
        }}
        onClick={addModule}
        onContextMenu={e => {
          e.preventDefault()
          e.persist()
          window.openSDBModuleContextMenu(e, moduleName)
        }}
      />
      <div className={classes.DrawerItemText}>
        {moduleName}
      </div>
    </div>
  )
}

export default SpaceDBModuleIcon
import React from 'react'
import { useDispatch } from 'react-redux'
import { CONTAINER } from '../../../../../audioModules/moduleTypes'
import { getSavedSMMFromName } from '../../../../../helpers/fileAccess'
import { performContainerMerge } from '../../../../../redux/replicateContainer'
import getModuleColor from '../../../../../theme/moduleColor'
import { colors } from '../../../../../theme/theme'
import useJSS from '../style'

interface Props {
  name: string
  totNumModules: number
  totNumConnections: number
  row: number
  col: number
  onClose: () => void
  isFocussed?: boolean
}

function FileModuleIcon({ name, totNumModules, totNumConnections, row, col, onClose, isFocussed }: Props) {
  const classes = useJSS()
  async function addModule() {
    const { containerID, modules, connections } = await getSavedSMMFromName(window.moduleDirectoryHandle, name)
    performContainerMerge(
      dispatch, 
      modules, 
      connections, 
      totNumModules, 
      totNumConnections,
      window.fillContainerID,
      containerID,
      row, col
    )
    onClose()
  }
  if (isFocussed) {
    window.addSelectedSearchModule = addModule
  }
  const dispatch = useDispatch()
  return (
    <div className={classes.DrawerItem}>
      <div className={classes.DrawerIcon}
        style={{ 
          backgroundColor: getModuleColor(CONTAINER),
          borderColor: isFocussed ? 'white' : colors.grey,
        }}
        onClick={addModule}
      />
      <div className={classes.DrawerItemText}>
        {name}
      </div>
    </div>
  )
}

export default FileModuleIcon
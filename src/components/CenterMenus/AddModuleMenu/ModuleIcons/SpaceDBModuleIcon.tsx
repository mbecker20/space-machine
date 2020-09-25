import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CONTAINER } from '../../../../audioModules/moduleTypes'
import { performContainerMerge } from '../../../../redux/replicateContainer'
import { RootState } from '../../../../redux/stateTSTypes'
import getModuleColor from '../../../../theme/moduleColor'
import useJSS from '../style'

interface Props {
  moduleName: string
  totNumberModules: number
  onClose: () => void
  row: number
  col: number

}

function SpaceDBModuleIcon({ moduleName, totNumberModules, onClose, row, col }: Props) {
  const classes = useJSS()
  const dispatch = useDispatch()
  const totNumberConnections = useSelector((state: RootState) => Object.keys(state.connections).length)
  return (
    <div className={classes.DrawerItem}>
      <div className={classes.DrawerIcon}
        style={{ backgroundColor: getModuleColor(CONTAINER) }}
        onClick={() => {
          window.containerSaveService.get(moduleName).then(({ containerID, modules, connections }: any) => {
            performContainerMerge(dispatch, modules, connections, totNumberModules, totNumberConnections, window.fillContainerID, containerID, row, col)
          })
          onClose()
        }}
      />
      <div className={classes.DrawerItemText}>
        {moduleName}
      </div>
    </div>
  )
}

export default SpaceDBModuleIcon
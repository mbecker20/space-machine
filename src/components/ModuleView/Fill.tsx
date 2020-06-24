import React from 'react'
import useJSS from './style'
import CSS from 'csstype'
import { sizes } from '../../theme/theme'
import ModuleViewMid from './Mid'
//import ModuleViewIcon from './Icon'
import { ContainerModule } from '../../redux/stateTSTypes'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/stateTSTypes'


interface Props {
  mod: ContainerModule
}

const iconGridSize = sizes.moduleView.iconGrid
const gutterGridSize = sizes.moduleView.gutterGrid

function ModuleViewFill({ mod }: Props) {
  const classes = useJSS()
  let gridStyle: CSS.Properties
  if(mod) {
    gridStyle = {
      gridTemplateRows: `repeat(${mod.maxRow}, ${iconGridSize} ${gutterGridSize})`,
      gridTemplateColumns: `repeat(${mod.maxCol}, ${iconGridSize} ${gutterGridSize})`,
    }
  } else {
    gridStyle = {
      gridTemplateColumns: `repeat(0, ${iconGridSize} ${gutterGridSize})`,
      gridTemplateRows: `repeat(0, ${iconGridSize} ${gutterGridSize})`,
    }
  }
  const containerMods = useSelector((state: RootState) => state.containerModules)
  return (
    <div className={classes.Fill} style={gridStyle}>
      {mod.childContainers.map((containerID) => {
        const containerMod = containerMods[containerID]
        return (
          <ModuleViewMid 
            containerMod={containerMod}
            row={containerMod.row}
            col={containerMod.col}
          />
        )
      })}
    </div>
  )
}

export default ModuleViewFill
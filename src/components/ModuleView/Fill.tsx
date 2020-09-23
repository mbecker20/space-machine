import React, { useState, useRef } from 'react'
import useJSS from './style'
import CSS from 'csstype'
import ModuleViewIcon from './Icon'
import { useSelector } from 'react-redux'
import { RootState, ContainerModule } from '../../redux/stateTSTypes'
import { getGridRange } from './helpers'
import { range } from '../../helpers/genFuncs'
import DropSquare from '../DropSquare/DropSquare'
import { ArcherContainer } from 'react-archer'
import { Button } from '../all'

declare global {
  interface Window { 
    refreshArcherContainer: () => void
    reRenderFillContainer: () => void
  }
}

function ModuleViewFill() {
  const classes = useJSS()
  const [reRender, toReRender] = useState(false)
  window.reRenderFillContainer = () => { toReRender(!reRender) }
  const { modules, baseContainerID } = useSelector((state: RootState) => {
    return {
      modules: state.modules,
      baseContainerID: state.baseContainerID
    }
  })
  const containerModule = modules[window.fillContainerID] as ContainerModule
  const { maxRow, maxCol } = getGridRange(containerModule.childModules, modules)
  let gridStyle: CSS.Properties
  const isEmpty = containerModule.childModules.length === 0
  if (isEmpty) {
    gridStyle = {
      gridTemplateRows: `repeat(${1}, ${'auto'})`,
      gridTemplateColumns: `repeat(${1}, ${'auto'})`,
    }
  } else {
    gridStyle = {
      gridTemplateRows: `repeat(${maxRow + 2}, ${'auto'})`,
      gridTemplateColumns: `repeat(${maxCol + 2}, ${'auto'})`,
    }
  }
  const archerContainerRef = useRef<ArcherContainer>(null)
  window.refreshArcherContainer = () => {archerContainerRef.current?.refreshScreen()}
  return (
    <div className={classes.FillBounder}>
      <div className={classes.FillHeaderBounder}>
        <div className={classes.FillHeader}
          style={{ width: `${containerModule.name.length / 2}em` }}
          onClick={(e) => {
            e.stopPropagation()
            window.openModuleRenameMenu(window.fillContainerID)
          }}
          onPointerDown={e => e.stopPropagation()}
        >
          {containerModule.name}
        </div>
        {containerModule.id === baseContainerID ? null :
        <Button style={{ height: '.7em' }}
          onPointerDown={() => {
            window.fillContainerID = containerModule.parentID as string
            window.reRenderFillContainer()
          }}
        >
          <div>back</div>
        </Button>
        }
      </div>
      <ArcherContainer ref={archerContainerRef}
        svgContainerStyle={{ zIndex: -1 }}
        strokeWidth={4}
        arrowLength={0}
      >
        <div className={classes.Fill} style={gridStyle}>
          {isEmpty ? <DropSquare row={0} col={0}/> :
          range(0, maxRow + 2).map(row => {
            return range(0, maxCol + 2).map(col => {
              return (
                <DropSquare
                  key={`${row} ${col}`}
                  row={row} 
                  col={col}
                />
              )
            })
          }).flat()}
          {containerModule.childModules.map(moduleID => {
            const mod = modules[moduleID]
            return (
              <ModuleViewIcon
                key={mod.id}
                mod={mod}
                gridRow={mod.row + 1}
                gridCol={mod.col + 1}
              />
            )
          })}
        </div>
      </ArcherContainer>
    </div>
  )
}

export default ModuleViewFill
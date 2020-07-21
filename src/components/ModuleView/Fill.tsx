import React, { useState, Fragment, useRef } from 'react'
import useJSS from './style'
import CSS from 'csstype'
import { sizes } from '../../theme/theme'
import ModuleViewIcon from './Icon'
import { useSelector } from 'react-redux'
import { RootState, ContainerModule } from '../../redux/stateTSTypes'
import { getGridRange } from './helpers'
import { range } from '../../helpers/genFuncs'
import DropSquare from '../DropSquare/DropSquare'
import { ArcherContainer, ArcherElement } from 'react-archer'
import { Button } from '../all'

declare global {
  interface Window { 
    setFillIsExpanded: (isExpanded: boolean) => void
    refreshArcherContainer: () => void
    reRenderFillContainer: () => void
  }
}

const iconGridSize = sizes.moduleView.iconGrid
const gutterGridSize = sizes.moduleView.gutterGrid

function ModuleViewFill() {
  const classes = useJSS()
  const [isExpanded, setIsExpanded] = useState(false)
  window.setFillIsExpanded = setIsExpanded
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
      gridTemplateRows: `repeat(${1}, ${iconGridSize} ${gutterGridSize})`,
      gridTemplateColumns: `repeat(${1}, ${iconGridSize} ${gutterGridSize})`,
    }
  } else {
    gridStyle = {
      gridTemplateRows: `repeat(${isExpanded ? maxRow + 2 : maxRow + 1}, ${iconGridSize} ${gutterGridSize})`,
      gridTemplateColumns: `repeat(${isExpanded ? maxCol + 2 : maxCol + 1}, ${iconGridSize} ${gutterGridSize})`,
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
            window.highlightedID = containerModule.id // need to add cases to on rename reducer to rename fill/base containers
            window.setLeftDrawerOpen(true)
          }}
        >
          {containerModule.name}
        </div>
        {containerModule.id === baseContainerID ? null :
        <Button style={{ height: '.7em' }}
          onClick={() => {
            window.fillContainerID = containerModule.parentID as string
            window.reRenderFillContainer()
            window.highlightedID = ''
            window.setLeftDrawerOpen(false)
        }}
        >
          <div>back</div>
        </Button>
        }
      </div>
      <div className={classes.Fill} style={gridStyle} onClick={() => {
        window.highlightedID = ''
        window.currSetHighlighted(false)
        window.currSetHighlighted = () => {}
        window.setLeftDrawerOpen(false)
      }}>
        {!isExpanded ? null : 
        isEmpty ? <DropSquare row={0} col={0}/> :
        range(0, isExpanded ? maxRow + 2 : maxRow + 1).map(row => {
          return range(0, isExpanded ? maxCol + 2 : maxCol + 1).map(col => {
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
              gridRow={mod.row * 2 + 1}
              gridCol={mod.col * 2 + 1}
            />
          )
        })}
        <ArcherContainer className={classes.ArcherContainer}
          style={{ 
            gridRow: `1 / span ${maxRow * 2 + 2}`, 
            gridColumn: `1 / span ${maxCol * 2 + 2}`,
          }}
          arrowLength={0}
          ref={archerContainerRef}
        >
          <div style={{ 
            display: 'grid',
            gridTemplateRows: `repeat(${maxRow + 1}, ${iconGridSize} ${gutterGridSize})`,
            gridTemplateColumns: `repeat(${maxCol + 1}, ${iconGridSize} ${gutterGridSize})`,
          }}>
          {containerModule.childModules.map(moduleID => {
            const mod = modules[moduleID]
            return (
              <Fragment key={mod.id}>
                <div style={{
                  gridColumn: `${mod.col * 2 + 1} / span 1`,
                  gridRow: `${mod.row * 2 + 1} / span 1`,
                  placeSelf: 'start start',
                  position: 'relative',
                  top: '10px',
                  left: '5px'
                }}>
                  <ArcherElement
                    id={mod.id + ' input'}
                  >
                    <div style={{ 
                      width: '10px', 
                      height: '10px', 
                      //backgroundColor: 'blue',
                    }}></div>
                  </ArcherElement>
                </div>
                <div style={{
                  gridColumn: `${mod.col * 2 + 1} / span 1`,
                  gridRow: `${mod.row * 2 + 1} / span 1`,
                  placeSelf: 'end start',
                  position: 'relative',
                  bottom: '10px',
                  left: '5px'
                }}>
                  <ArcherElement
                    id={mod.id + ' controls'}
                  >
                    <div style={{
                      width: '10px',
                      height: '10px',
                      //backgroundColor: 'yellow',
                    }}></div>
                  </ArcherElement>
                </div>
                <div style={{
                  gridColumn: `${mod.col * 2 + 1} / span 1`,
                  gridRow: `${mod.row * 2 + 1} / span 1`,
                  placeSelf: 'start end',
                  position: 'relative',
                  top: '10px',
                  right: '5px'
                }}>
                  <ArcherElement
                    id={mod.id + ' output'}
                    relations={mod.outputs.map(outputData => {
                      return {
                        targetId: outputData[1] === '' ? outputData[0] + ' input' : outputData[0] + ' controls',
                        targetAnchor: 'left',
                        sourceAnchor: 'right',
                        style: {
                          strokeColor: outputData[1] === '' ? 'red' : 'blue',
                          strokeWidth: outputData[1] === '' ? 1 : 1,
                        }
                      }
                    })}
                  >
                    <div style={{
                      width: '10px',
                      height: '10px',
                      //backgroundColor: 'red',
                    }}></div>
                  </ArcherElement>
                </div>
              </Fragment>
            )
          })}
          </div>
        </ArcherContainer>
      </div>
    </div>
  )
}

export default ModuleViewFill
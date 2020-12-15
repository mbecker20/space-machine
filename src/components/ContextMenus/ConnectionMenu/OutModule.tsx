import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/stateTSTypes'
import getModuleColor from '../../../theme/moduleColor'
import AutoPlacingGrid from '../../AutoPlacingGrid/AutoPlacingGrid'
import FlexCol from '../../Flex/FlexCol'
import useJSS from './style'

interface Props {
  modID: string
  startsBig: boolean
  isBase: boolean
}

// only rendered for base modules
function OutModule({ modID, startsBig, isBase }: Props) {
  const classes = useJSS()
  const mod = useSelector((state: RootState) => state.modules[modID])
  const [isBig, setBig] = useState(startsBig)
  return (
    <div className={classes.Module} 
      style={{ 
        backgroundColor: getModuleColor(mod.moduleType),
        overflow: 'visible',
        marginRight: isBase ? '1em' : '0em',
      }}
    >
      <div className={classes.Name}
        onClick={() => { setBig(!isBig) }}
      >{ mod.name }</div>
      {!isBig ? null :
      mod.connectionOutputs.length > 1 ?
      <AutoPlacingGrid direction='row' numCols='2' gap='.2em'>
        {mod.connectionOutputs.map((output, index) => {
          return (
            <FlexCol className={classes.ConnectorBounder} key={index}>
              <div className={classes.IconConnector}
                draggable={true}
                onDragStart={e => {
                  e.dataTransfer.setData('actualFromID', modID)
                  e.dataTransfer.setData('outputIndex', index.toString())
                }}
              />
              {mod.connectionOutputs.length === 1 ? null : 
                <div className={classes.ConnectorName}>{output}</div>
              }
            </FlexCol>
          )
        })}
      </AutoPlacingGrid>
      :
      <FlexCol className={classes.ConnectorBounder}>
        <div className={classes.IconConnector}
          draggable={true}
          onDragStart={e => {
            e.dataTransfer.setData('actualFromID', modID)
            e.dataTransfer.setData('outputIndex', '0')
          }}
        />
      </FlexCol>
      }
    </div>
  )
}

export default OutModule
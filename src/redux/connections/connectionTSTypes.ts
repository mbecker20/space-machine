export interface AddConnectionAction {
  type: string
  fromID: string
  toID: string
  param: string
  outputIndex: number // audioNode i/o index (audioNode.connect(otherAudioNode, outputIndex))
  inputIndex: number
  containerOutputChildID?: string
  containerInputChildID?: string
}

export interface RemoveConnectionAction {
  type: string
  fromID: string
  toID: string
  connectionID: string
}

export type ConnectionAction = AddConnectionAction | RemoveConnectionAction
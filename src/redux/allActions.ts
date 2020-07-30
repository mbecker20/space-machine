export { down1Base, changeBase } from './baseContainerID/bcidActions'
export { 
  addModule, 
  moveModule, 
  renameModule, 
  markContainerInput,
  unmarkContainerInput,
  markContainerOutput,
  unmarkContainerOutput,
  markContainerControl,
  unmarkContainerControl,
} from './modules/moduleActions'
export {
  addConnection,
  removeConnection,
  removeModule,
} from './connections/connectionActions'
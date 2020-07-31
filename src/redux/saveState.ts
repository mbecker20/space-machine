import { RootState } from "./stateTSTypes";

export function saveState() {

}

export function restoreFromState({ modules, connections }: RootState) {
  Object.keys(modules).forEach(modID => {
    const { name, parentID } = modules[modID]
    window.audioModules[modID] = window.addModule(modID, name, )
  })
}
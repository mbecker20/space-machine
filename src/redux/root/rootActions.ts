import { RESTORE_FROM_STATE } from "./rootActionTypes";
import { RootState } from "../stateTSTypes";
import { RestoreFromStateAction } from "./rootActionTSTypes";

export function restoreFromState(state: RootState): RestoreFromStateAction {
  return {
    type: RESTORE_FROM_STATE,
    state,
  }
}
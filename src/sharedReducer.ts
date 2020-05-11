import { useReducer, Reducer, useCallback, Dispatch, ReducerAction } from "react";
import useBus, { dispatch as emit } from "./use-bus";
import { uuidv4 } from "./utils";

export function createSharedReducer<S, A>(reducer: Reducer<S, A>, initial: S) {
    let mutableState: S = initial;
    const uniqBus = uuidv4();
    return {
        useSharedReducer: (): [S, Dispatch<ReducerAction<Reducer<S, A>>>] => {
            const innerReducer = useCallback((state: S, action: A) => {
                mutableState = reducer(state, action)
                return mutableState
            }, [reducer])
            const [currentState, innerDispath] = useReducer(innerReducer, mutableState)
            const dispath = (action: A) => {
                emit({ type: uniqBus, payload: action })
            }
            useBus(uniqBus, (action) => {
                innerDispath(action.payload)
            }, [innerDispath]);
            return [currentState, dispath]
        }
    }
}
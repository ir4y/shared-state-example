import { useReducer, Reducer, useCallback, Dispatch, ReducerAction, useEffect } from "react";
import useBus, { dispatch as emit } from "./use-bus";
import { uuidv4 } from "./utils";

export function createSharedReducer<S, A>(reducer: Reducer<S, A>, initial: S) {
    let mutableState: S = initial;
    const uniqBus = uuidv4();
    return {
        useSharedState: (): S => {
            const [state, innerDispath] = useReducer(reducer, mutableState)
            useEffect(() => {
                mutableState = state
            }, [state])
            useBus(uniqBus, (action) => {
                innerDispath(action.payload)
            }, [innerDispath]);
            return state
        },
        dispatch: (action: A) => emit({ type: uniqBus, payload: action })
    }
}
import React, { useReducer, Reducer, useCallback, Dispatch, ReducerAction } from "react";
import useBus, { dispatch as emit } from "./use-bus";
import { uuidv4 } from "./utils";

type SetStateAction<S> = {
    type: "____setState",
    state: S
}

function isSetStateAction<S>(a: any): a is SetStateAction<S> {
    return a.type === "____setState"
}

export function createSharedReducer<S, A>(reducer: Reducer<S, A>, initial: S) {
    let mutableState: S = initial;
    const uniqBus = uuidv4();
    return {
        useSharedReducer: (): [S, Dispatch<ReducerAction<Reducer<S, A>>>] => {
            const innerReducer = useCallback((state: S, action: A | { type: "____setState", state: S }) => {
                if (isSetStateAction(action)) {
                    mutableState = action.state
                    return action.state;
                } else {
                    return reducer(state, action)
                }
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
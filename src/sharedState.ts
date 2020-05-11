import useBus, { dispatch } from "./use-bus";
import { useState } from "react";
import { uuidv4 } from "./utils";

interface StateManager<S>{
    setSharedState: (s:S) => void
    useSharedState: () => S 
}

export function createSharedState<S>(initial: S): StateManager<S>{
    const uniqBus = uuidv4();
    let mutableState:S = initial;

    return {
        setSharedState: (s:S) => {
            mutableState = s;
            dispatch({type: uniqBus, s})
        },
        useSharedState: () => {
            const [state, setState] = useState<S>(mutableState)
            useBus(uniqBus, ({ s }) => {
                setState(s)
            })
            return state;
        }
    }
}
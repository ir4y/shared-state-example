import useBus, { dispatch } from "./use-bus";
import { useState } from "react";

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

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
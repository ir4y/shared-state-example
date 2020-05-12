import useBus, { dispatch } from "./use-bus";
import { useState } from "react";
import { uuidv4 } from "./utils";

interface StateManager<S> {
    setSharedState: (s: S) => void
    useSharedState: () => [S, (s: S) => void]
}

export function createSharedState<S>(initial: S): StateManager<S> {
    const uniqBus = uuidv4();
    let mutableState: S = initial;
    const setter = (s: S) => {
        mutableState = s;
        dispatch({ type: uniqBus, s })
    }

    return {
        setSharedState: setter,
        useSharedState: () => {
            const [state, setState] = useState<S>(mutableState)
            useBus(uniqBus, ({ s }) => {
                setState(s)
            }, [setState])
            return [state, setter];
        }
    }
}

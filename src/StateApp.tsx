import React from 'react';
import './App.css';
import { createSharedState } from './sharedState';
import _ from 'lodash';

interface Data {
    name: string
    count: number
}

const initial: Data = {
    name: 'Ilya',
    count: 0,
}

const dataManager = createSharedState<Data>(initial)

export function StateApp() {
    return (
        <div className="App">
            <Form1 />
            <Form2 />
        </div>
    );
}

function Form1() {
    const [state, setState] = dataManager.useSharedState()
    return <div>
        <button onClick={() => setState({ ...state, count: state.count + 1 })}>+</button>
        {state.count}
        <button onClick={() => setState({ ...state, count: state.count - 1 })}>-</button>
    </div>
}

function Form2() {
    const [{ count }, setState] = dataManager.useSharedState()
    const l = count > 0 ? count : 0
    return <div>
        {_.range(l).map((i) => (<Form3 key={i} />))}
    </div>
}

function Form3() {
    const [state, setState] = dataManager.useSharedState()
    return <div>
        <input value={state.name}
            onChange={(e) => setState({ ...state, name: e.target.value })} />
        <button onClick={() => setState({ ...state, count: state.count - 1 })}>-</button>
    </div>
}

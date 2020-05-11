import React, { useReducer } from 'react';
import './App.css';
import _ from 'lodash';
import { StateApp } from './StateApp';
import { createSharedReducer } from './sharedReducer';


interface Data {
    name: string
    count: number
}

const initial = {
    name: 'Ilya',
    count: 0,
}
type Action = { type: "inc" } | { type: "dec" } | { type: "setName", name: string }

class NeverError extends Error {
    constructor(value: never) {
        super(`Unreachable statement: ${value}`);
    }
}

function reducer(state: Data, action: Action) {
    switch (action.type) {
        case "inc":
            return { ...state, count: state.count + 1 }
        case "dec":
            return { ...state, count: state.count - 1 }
        case "setName":
            return { ...state, name: action.name }
        // default:
        //     throw new NeverError(action.type)
    }
}

const sharedReducer = createSharedReducer(reducer, initial)

export function ReducerApp() {
    return (
        <div className="App">
            <Form1 />
            <Form2 />
        </div>
    )
}

function Form1() {
    const [state, dispatch] = sharedReducer.useSharedReducer();
    return <div>
        <button onClick={() => dispatch({ type: "inc" })}>+</button>
        {state.count}
        <button onClick={() => dispatch({ type: "dec" })}>-</button>
    </div>
}

function Form2() {
    const [s] = sharedReducer.useSharedReducer();
    const l = s.count > 0 ? s.count : 0
    return <div>
        {_.range(l).map((i) => (<Form3 key={i} />))}
    </div>

}

function Form3() {
    const [s, dispatch] = sharedReducer.useSharedReducer();
    return <div>
        <input value={s.name}
            onChange={(e) => dispatch({ type: "setName", name: e.target.value })} />
        <button onClick={() => dispatch({ type: "dec" })}>-</button>
    </div>
}
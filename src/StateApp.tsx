import React, { useReducer } from 'react';
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
  const s = dataManager.useSharedState()
  return <div>
    <button onClick={() => dataManager.setSharedState({ ...s, count: s.count + 1 })}>+</button>
    {s.count}
    <button onClick={() => dataManager.setSharedState({ ...s, count: s.count - 1 })}>-</button>
  </div>
}

function Form2() {
  const s = dataManager.useSharedState()
  const l = s.count > 0 ? s.count : 0
  return <div>
    {_.range(l).map((i) => (<Form3 key={i} />))}
  </div>
}

function Form3() {
  const s = dataManager.useSharedState()
  return <div>
    <input value={s.name}
      onChange={(e) => dataManager.setSharedState({ ...s, name: e.target.value })} />
    <button onClick={() => dataManager.setSharedState({ ...s, count: s.count - 1 })}>-</button>
  </div>
}


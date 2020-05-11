import React from 'react';
import './App.css';
import { createSharedState } from './sharedState';
import _ from 'lodash';

interface Data{
  name: string
  count: number
}

const initial:Data = {
  name: 'Ilya',
  count: 0,
}

const dataManager = createSharedState<Data>(initial)

function App() {
  console.log("Render App")
  return (
    <div className="App">
      <Form1/>
      <Form3/>
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
  return <div>
    <input value={s.name}
      onChange={(e) => dataManager.setSharedState({ ...s, name: e.target.value })} />
  </div>
}

function Form3() {
  const s = dataManager.useSharedState()
  const l = s.count > 0 ? s.count : 0
  return <div>
    {_.range(l).map((i) => (<Form2 key={i}/>))}
  </div>
}



export default App;

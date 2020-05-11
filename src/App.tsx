import React  from 'react';
import './App.css';
import _ from 'lodash';
import { StateApp } from './StateApp';
import { ReducerApp } from './ReducerApp';

export default function App() {
  console.log("Render App")
  return (
    <div className="App">
      <StateApp/>
      <ReducerApp/>
    </div>
  );
}
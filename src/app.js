import React, { useState, useReducer } from 'react';
import { initialState, reducer, AnimationContext } from './state/context';
import { useKeyPress } from './scripts/useKeyPress';
import AppP5 from './components/AppP5';

const App = () => {
  const [p5Mode, setp5Mode] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);

  const renderView = () => {
    return p5Mode ? <AppP5 /> : 'appGL';
  }

  useKeyPress('m', () => {
    console.log('tab pressed');
    setp5Mode(!p5Mode);
  });

  return (
    <AnimationContext.Provider value={{ state, dispatch }}>
      {renderView()}
    </AnimationContext.Provider>
  )
}

export default App;

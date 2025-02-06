import React, { useState, useReducer } from 'react';
import { initialState, reducer, AnimationContext } from './state/context';
import AppP5 from './components/AppP5';

// import { DrawButton, AnimateButton } from './components/SpecialButtons';
// import Controls from './components/Controls';
// import Canvas from './components/Canvas';

const App = () => {
 const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AnimationContext.Provider value={{ state, dispatch }}>
      <AppP5 />
{/*      <div className="app">
        <DrawButton />
        <div className="drawing-interface">
          <Controls />
          <Canvas />
        </div>
        <AnimateButton />
      </div>*/}
    </AnimationContext.Provider>
  )
}

export default App;

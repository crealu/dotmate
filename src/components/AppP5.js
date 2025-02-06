import React from 'react';
import Controls from './Controls';
import Canvas from './Canvas';
import { DrawButton, AnimateButton } from './SpecialButtons';

const AppP5 = () => {
 return (
    <div className="app">
      <DrawButton />
      <div className="drawing-interface">
        <Controls />
        <Canvas />
      </div>
      <AnimateButton />
    </div>
  ) 
}

export default AppP5;
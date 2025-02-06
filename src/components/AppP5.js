import React from 'react';
import Controls from './p5/Controls';
import Canvas from './p5/Canvas';
import { DrawButton, AnimateButton } from './p5/SpecialButtons';

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
import React, { useReducer, useContext } from 'react';
import { AnimationContext } from '../../state/context';
import Sliders from './Sliders';
import DotInputs from './DotInputs';

const Controls = () => {
  const {state, dispatch} = useContext(AnimationContext);

  const toggleFill = () => dispatch({type: 'toggle fill'});
  const toggleBackground = () => dispatch({type: 'toggle background'});

  return (
    <div className="controls">
      <button
        className="toggle-btn toggle-fill-btn"
        onClick={toggleFill}
      >
        Fill: {state.hasFill ? 'On' : 'Off'}
      </button>
      <button
        className="toggle-btn toggle-bg-btn"
        onClick={toggleBackground}
      >
        Background: {state.hasBackground ? 'On' : 'Off'}
      </button>
      <Sliders />
      <DotInputs />
    </div>
  )
}

export default Controls;

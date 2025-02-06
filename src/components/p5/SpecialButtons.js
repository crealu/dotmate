import React, { useContext } from 'react';
import { AnimationContext } from '../../state/context';
import { resetVectors } from '../../scripts/animate';

const DrawButton = () => {
  const {state, dispatch} = useContext(AnimationContext);
  const toggleDrawing = () => dispatch({type: 'toggle drawing'});

  return (
    <button
      className="toggle-btn toggle-drawing-btn"
      onClick={toggleDrawing}
      style={{ background: `${state.drawing ? 'lightblue' : '#d96e6e'}`}}
    >
      Mode: {state.drawing ? 'Drawing' : 'Editing'}
    </button>
  )
}

const AnimateButton = () => {
  const {state, dispatch} = useContext(AnimationContext);

  function updateVectors() {
    let morphVectorArray = resetVectors(state.logoVectors, false);
    let dotVectorArray = resetVectors(state.dots, true);

    dispatch({
      type: 'set morph vectors',
      payload: morphVectorArray
    });

    dispatch({
      type: 'set dot vectors',
      payload: dotVectorArray
    });
  }

  function toggleAnimating(event) {
    if (event.target.className.includes('animate')) {
      dispatch({type: 'toggle animating'});
      updateVectors();
    }
  }

  return (
    <button
      className="toggle-btn toggle-animate-btn"
      onClick={toggleAnimating}
    >
      {state.animating ? 'Clear' : 'Animate'}
    </button>
  )
}

export { DrawButton, AnimateButton };

import React, { useContext } from 'react';
import { AnimationContext } from '../state/context';
import { drawGuide, drawDots, drawDot, redraw, onCanvas } from '../scripts/draw';
import { morph, loadVectors, resetVectors } from '../scripts/animate';
import Sketch from 'react-p5';

const Canvas = () => {
  const {state, dispatch} = useContext(AnimationContext);

  function setup(p5) {
    const canvasWrapper = document.getElementsByClassName('canvas-wrapper')[0];
    const canvas = p5.createCanvas(500, 500).parent(canvasWrapper);
    loadVectors(p5, state.morphVectors, state.logoVectors);
  }

  function draw(p5) {
    if (state.animating) {
      morph(
        p5,
        state.dotVectors,
        state.morphVectors,
        state.logoVectors,
        state.lerpSpeed,
        state.strokeWeight,
        state.hasFill,
        state.hasBackground
      );
      drawGuide(p5);
		} else {
      p5.strokeWeight(1);
      p5.background(80);
      drawGuide(p5);
      drawDots(p5, state.dots, state.currentDot, state.drawing);
    }
  }

  function mouseClicked(p5, event) {
    if (state.drawing) {
      if (event.target.className == 'p5Canvas') {
        const newDot = drawDot(p5, event.layerX, event.layerY, state.count);
        if (newDot != null) {
          dispatch({type: 'add dot', payload: newDot});
          dispatch({type: 'increment'});
          updateVectors();
        }
      }
    }
  }

  function mousePressed(p5, event) {
    const newDots = redraw(p5, event, state.dots, state.current, state.drawing);
    dispatch({type: 'set dots', payload: newDots});
  }

  function mouseDragged(p5, event) {
    const newCurrent = redraw(p5, event, state.dots, state.current, state.drawing);
    dispatch({type: 'set current', payload: newCurrent});
    updateVectors();
  }

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

  return (
    <div className="canvas-wrapper">
      <Sketch
        setup={setup}
        draw={draw}
        mouseClicked={mouseClicked}
        mousePressed={mousePressed}
        mouseDragged={mouseDragged}
      />
    </div>
  )
}

export default Canvas;

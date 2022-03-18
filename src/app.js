import React, { useState, useContext } from 'react';
import Sketch from 'react-p5';
import Slider from './components/Slider';
import DotInputs from './components/DotInputs';
import { drawGuide, drawDots, drawDot, redraw } from './scripts/draw';
import { morph, loadVectors, resetVectors } from './scripts/animate';
import { clickOnCanvas } from './scripts/click';

const App = () => {
	const [dots, setDots] = useState([]);
	const [dotVectors, setDotVectors] = useState([]);
	const [morphVectors, setMorphVectors] = useState([]);
	const [logoVectors, setLogoVectors] = useState([]);
	const [currentDot, setCurrentDot] = useState(0);
	const [count, setCount] = useState(0);
	const [isDrawing, setIsDrawing] = useState(true);
	const [isAnimating, setIsAnimating] = useState(false);
	const [lerpSpeed, setLerpSpeed] = useState(0.11);
	const [strokeWeight, setStrokeWeight] = useState(0.1);
	const [useFill, setUseFill] = useState(false);
	const [useBackground, setUseBackground] = useState(false);

	function setup(p5) {
		const canvasWrapper = document.getElementsByClassName('canvas-wrapper')[0];
		const canvas = p5.createCanvas(500, 500).parent(canvasWrapper);
		loadVectors(p5, morphVectors, logoVectors);
	}

	function draw(p5) {
		if (isAnimating) {
			morph(p5, dotVectors, morphVectors, logoVectors,
						lerpSpeed, strokeWeight, useFill, useBackground);
			drawGuide(p5);
		} else {
			p5.strokeWeight(1);
			p5.background(80);
			drawGuide(p5);
			drawDots(p5, dots, currentDot, isDrawing);
		}
	}

	function mouseClicked(p5, event) {
		if (isDrawing) {
			if (clickOnCanvas(event)) {
				const newDot = drawDot(p5, event.layerX, event.layerY, count);
				if (newDot != null) {
					const newDotsState = [...dots, ...[newDot]]
					setDots(newDotsState)
					setCount(count + 1);
					updateVectors();
				}
			}
		}
	}

	function mousePressed(p5, event) {
		redraw(p5, event, dots, currentDot, setCurrentDot, isDrawing);
	}

	function mouseDragged(p5, event) {
		redraw(p5, event, dots, currentDot, setDots, isDrawing, updateVectors);
	}

	function updateVectors() {
		let morphVectorArray = resetVectors(logoVectors, false);
		let dotVectorArray = resetVectors(dots, true);
		setMorphVectors(morphVectorArray);
		setDotVectors(dotVectorArray);
	}

	function selectDot(element) {
		if (element.tagName == 'INPUT' || element.tabIndex == -1) {
			selectDot(element.parentElement);
		} else {
			setCurrentDot(element.tabIndex);
		}
	}

	function toggleAnimating() {
		if (isAnimating) {
			updateVectors();
		}
		setIsAnimating(prevIsAnimating => !isAnimating);
	}

	function toggleFill() {
		setUseFill(prevUseFill => !prevUseFill);
	}

	function toggleBackground() {
		setUseBackground(prevUseBackground => !prevUseBackground);
	}

	return (
		<div className="app">
			<button
				className="toggle-btn toggle-drawing-btn"
				onClick={() => setIsDrawing(prevIsDrawing => !prevIsDrawing)}
				style={{ background: `${isDrawing ? 'lightblue' : '#d96e6e'}`}}
			>
				Mode: {isDrawing ? 'Drawing' : 'Editing'}
			</button>
			<div className="drawing-interface">
				<div className="controls">
					<button className="toggle-btn toggle-fill-btn" onClick={toggleFill}>
						Fill: {useFill ? 'On' : 'Off'}
					</button>
					<button className="toggle-btn toggle-bg-btn" onClick={toggleBackground}>
						Background: {useBackground ? 'On' : 'Off'}
					</button>
					<div className="animation-controls">
						<Slider
							text="Lerp speed:"
							data={lerpSpeed}
							max="0.3"
							update={(e) => setLerpSpeed(e.target.value)}
						/>
						<Slider
							text="Stroke weight:"
							data={strokeWeight}
							max="10.00"
							update={(e) => setStrokeWeight(e.target.value)}
						/>
					</div>
					<DotInputs
						dots={dots}
						currentDot={currentDot}
						selectDot={selectDot}
					/>
				</div>
				<div className="canvas-wrapper">
					<Sketch
						setup={setup}
						draw={draw}
						mouseClicked={mouseClicked}
						mousePressed={mousePressed}
						mouseDragged={mouseDragged}
					/>
				</div>
			</div>
			<button className="toggle-btn toggle-animate-btn" onClick={toggleAnimating}>
				{isAnimating ? 'Clear' : 'Animate'}
			</button>
		</div>
	)
}

export default App;

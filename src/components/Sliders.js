import React, { useContext } from 'react';
import { AnimationContext } from '../state/context';

const Slider = ({ text, data, max, update }) => {
	return (
		<div>
			<p>{text}</p>
      <p>{data.toString()}</p>
			<input
				className="range-input"
				type="range"
				min="0.01"
				max={max}
				step="0.01"
				defaultValue={data}
				onChange={update}
			/>
		</div>
	)
}

const Sliders = () => {
	const {state, dispatch} = useContext(AnimationContext);

	function setLerpSpeed(e) {
		dispatch({
			type: 'set lerp speed',
			payload: e.target.value
		});
	}

	function setStrokeWeight(e) {
		dispatch({
			type: 'set stroke weight',
			payload: e.target.value
		});
	}

	return (
		<div className="animation-controls">
			<Slider
				text="Lerp speed:"
				data={state.lerpSpeed}
				max="0.3"
				update={setLerpSpeed}
			/>
			<Slider
				text="Stroke weight:"
				data={state.strokeWeight}
				max="10.00"
				update={setStrokeWeight}
			/>
		</div>
	)
}

export default Sliders;

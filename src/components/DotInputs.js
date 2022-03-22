import React, { useContext } from 'react';
import { AnimationContext } from '../state/context';

const shadowStyle = {
  boxShadow: 'inset 0px 0px 10px white',
}

const noShadowStyle = {
  boxShadow: 'none',
}

const DotInput = ({ tabIndex, data, onClick, current }) => {
	return (
		<div
			className="dot"
			tabIndex={tabIndex}
			onClick={(e) => onClick(e.target)}
			style={current == tabIndex ? shadowStyle : noShadowStyle}
		>
			<p>dot {tabIndex}</p>
			<p>X: <input defaultValue={data[0]} /></p>
			<p>Y: <input defaultValue={data[1]} /></p>
		</div>
	)
}

const DotInputs = () => {
	const {state, dispatch} = useContext(AnimationContext);

	function selectDot(element) {
		if (element.tagName == 'INPUT' || element.tabIndex == -1) {
			selectDot(element.parentElement);
		} else {
			dispatch({
				type: 'set current',
				payload: element.tabIndex
			});
		}
	}

	return (
		<div className="d-inputs">
			{state.dots.map((dot, idx) => (
				<DotInput
					key={idx}
					tabIndex={idx}
					data={dot}
					onClick={selectDot}
					current={state.current}
				/>
			))}
		</div>
	)
}

export default DotInputs;
//

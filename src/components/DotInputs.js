import React from 'react';

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

const DotInputs = ({ dots, currentDot, selectDot }) => {
	return (
		<div className="d-inputs">
			{dots.map((dot, idx) => (
				<DotInput
					key={idx}
					tabIndex={idx}
					data={dot}
					onClick={selectDot}
					current={currentDot}
				/>
			))}
		</div>
	)
}

export default DotInputs;

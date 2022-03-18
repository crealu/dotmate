import React from 'react';

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

export default Slider;

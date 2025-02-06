import { useEffect } from 'react';
// let audioEl = new Audio('audio/menunav.mp3');
// audioEl.play();

export function useKeyPress(key, action) {
	const keyDown = (e) => { e.key == key ? action() : null }
	useEffect(() => {
		document.addEventListener("keydown", keyDown)
		return () => {
			document.removeEventListener('keydown', keyDown);
		}
	}, [keyDown]);
}

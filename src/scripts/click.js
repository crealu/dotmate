const clickOnCanvas = (e) => {
	return (
		(e.pageX > window.innerWidth/2 && e.pageX < window.innerWidth) &&
		(e.pageY < window.innerHeight - 300 && e.pageY > 150)
	)
}

export { clickOnCanvas };

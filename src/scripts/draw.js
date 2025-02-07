// canvas dimensions
// const width = 500;
// const height = 500;

function drawGuide(p5, width, height) {
	p5.stroke(150);
	p5.line(width/2, 10, width/2, height-10);
	p5.line(10, height/2, width-10, height/2);
}

function drawDot(p5, mouseX, mouseY, count) {
  const x = mouseX - width/2;
  const y = mouseY - height/2;
  p5.ellipse(x, y, 10, 10);
  return [x, y];
}

function drawDots(p5, lines, currLine, isDrawing, width, height) {
  p5.translate(width/2, height/2);
  lines.forEach((v, i) => {
    const currentRGB = i == currLine
      ? [251, 236, 100]
      : isDrawing ? [173, 216, 230]
			: [250, 140, 140];

    p5.stroke(...currentRGB);
		p5.fill(...currentRGB);
		p5.ellipse(v[0], v[1], 20, 20);
  });
}

function redraw(p5, event, dots, current, drawing, useDrag) {
	if (!drawing) {
		const mouseX = event.layerX - 250;
		const mouseY = event.layerY - 250;
		if (useDrag != undefined) {
			dots[current][0] = mouseX;
			dots[current][1] = mouseY;
			return dots;
		} else {
			for (let i = 0; i < dots.length; i++) {
				if (getVicinity(mouseX, mouseY, dots[i][0], dots[i][1])) {
					dots[i][0] = mouseX;
					dots[i][1] = mouseY;
					return i;
				}
			}
		}
	}
}

const getVicinity = (mouseX, mouseY, dotX, dotY) => {
  return (
    (mouseX <= dotX + 10 && mouseX >= dotX - 10) &&
    (mouseY <= dotY + 10 && mouseY >= dotY - 10)
  )
}

const onCanvas = (e) => {
	return (
		(e.pageX > window.innerWidth/2 && e.pageX < window.innerWidth) &&
		(e.pageY < window.innerHeight - 200 && e.pageY > 150)
	)
}

export { drawGuide, drawDots, drawDot, redraw, onCanvas };

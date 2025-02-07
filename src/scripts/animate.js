import logoPoints from './logo.js';

function loadVectors(p5, morphVectors, logoVectors) {
	let scaleFactor = 1.0;

	if (window.innerWidth < 500) {
		scaleFactor = window.innerWidth / 500;

		let difference = 500 - window.innerWidth;
		console.log(difference);

		console.log(scaleFactor);
		console.log(logoPoints[0][0]);

		for (let a = 0; a < logoPoints.length; a++) {
			let b = logoPoints[a].map(point => {
				return (point - difference) * scaleFactor;
			});

			logoPoints[a] = b;
		}

		console.log(logoPoints[0][0]);
	}

	function vectorFromPoints(arr) {
		let v1 = p5.createVector(arr[0], arr[1]);
		let v2 = p5.createVector(arr[2], arr[3]);
		let v3 = p5.createVector(arr[4], arr[5]);
		let v4 = p5.createVector(arr[6], arr[7]);
		return [v1, v2, v3, v4];
	}

	for (let i = 0; i < logoPoints.length; i++) {
		logoVectors.push(vectorFromPoints(logoPoints[i]));
		morphVectors.push([
			p5.createVector(),
			p5.createVector(),
			p5.createVector(),
			p5.createVector()
		]);
	}
}

function morph(
	p5,
	dotVecs,
	morphVectors,
	logoVectors,
	lerpSpeed,
	strokeWeight,
	useFill,
	useBackground
) {
  for (let i = 0; i < logoVectors.length; i++) {
    let lv1 = logoVectors[i][0];
    let lv2 = logoVectors[i][1];
    let lv3 = logoVectors[i][2];
    let lv4 = logoVectors[i][3];

    let mv1 = morphVectors[i][0];
    let mv2 = morphVectors[i][1];
    let mv3 = morphVectors[i][2];
    let mv4 = morphVectors[i][3];

    mv1.lerp(lv1, lerpSpeed);
    mv2.lerp(lv2, lerpSpeed);
    mv3.lerp(lv3, lerpSpeed);
    mv4.lerp(lv4, lerpSpeed);

    if (dotVecs[i] != undefined) {
      let dv1 = dotVecs[i][0];
      let dv2 = dotVecs[i][1];
      let dv3 = dotVecs[i][2];
      let dv4 = dotVecs[i][3];

      dv1.lerp(lv1, lerpSpeed);
      dv2.lerp(lv2, lerpSpeed);
      dv3.lerp(lv3, lerpSpeed);
      dv4.lerp(lv4, lerpSpeed);
    }
  }

	if (useBackground) {
		p5.background(81);
	}

	p5.strokeWeight(strokeWeight);
	p5.stroke(250, 140, 140);
  p5.translate(250, 250);

  dotVecs.forEach(v => {
    p5.beginShape();
    p5.bezier(v[0].x, v[0].y, v[2].x, v[2].y, v[1].x, v[1].y, v[3].x, v[3].y);
    p5.endShape();
  });

  morphVectors.forEach(v => {
    p5.beginShape();
    p5.bezier(v[0].x, v[0].y, v[2].x, v[2].y, v[1].x, v[1].y, v[3].x, v[3].y);
    p5.endShape();
  });

	if (useFill) {
		p5.fill(251, 236, 100)
	} else {
		p5.noFill();
	}
}

function resetVectors(arr, useDots) {
	let vectorArray = [];
	for (let i = 0; i < arr.length; i++) {
		const [x, y] = useDots ? [arr[i][0], arr[i][1]] : [0, 0];
		vectorArray.push([
			new p5.Vector(x, y, 0),
			new p5.Vector(0, 0, 0),
			new p5.Vector(0, 0, 0),
			new p5.Vector(0, 0, 0)
		]);
	}

	return vectorArray;
}

export { morph, loadVectors, resetVectors };

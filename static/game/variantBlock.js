import Settings from './settings.js'
import Konva from 'konva';

export default
class VariantBlock {
	constructor(number, text) {

		this.settings = new Settings;
		this.isAble = false;
		this.kind = 0;
		this.field = 0;
		switch (number) {
			case (0):
				this.kind = this.settings.pentagonRPS;
				break;
			case (1):
				this.kind = this.settings.pentagonSBG;
				break;
			case (2):
				this.kind = this.settings.pentagonGYR;
				break;
			case (3):
				this.kind = this.settings.star;
				break;
		}
		if (text) {
			this.text = new Konva.Text({
				x: this.settings.variantsX,
				y: this.settings.variantsY + number * this.settings.betweenVariants,
				width: this.settings.variantsXSize,
				text: text,
				fontSize: 18,
				fill: 'red',
				padding: 15,
				align: 'center',
			});
		}

		this.draw = new Konva.Rect({
			x: this.settings.variantsX,
			y: this.settings.variantsY + number * this.settings.betweenVariants,
			width: this.settings.variantsXSize,
			height: (text ? this.text.getHeight() : this.settings.variantsYSize),
			fill: 'grey',
			stroke: 'black',
			strokeWidth: 2,
			cornerRadius: 10
		});

		// let width = this.settings.hintsFieldElement.offsetWidth;
		// let height = this.settings.hintsFieldElement.offsetHeight;

		// this.draw = new Konva.Rect({
		// 		x: width * 0.05,
		// 		y: this.settings.mapY + number * height * 0.15,
		// 		width: width * 0.9,
		// 		height: height * 0.1,
		// 		fill: 'grey',
		// 		stroke: 'black',
		// 		strokeWidth: 2
		// });
	}
}

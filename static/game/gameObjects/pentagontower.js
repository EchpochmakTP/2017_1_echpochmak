import Settings from '../settings.js'
import Konva from 'konva';

export default
class PentagonTower {
	constructor(name, x, y, radius) {
		this.settings = new Settings();
		this.draw = new Konva.RegularPolygon({
			x: x,
			y: y,
			sides: 5,
			radius: radius,
			fillRadialGradientStartPoint: 0,
			fillRadialGradientStartRadius: 0,
			fillRadialGradientEndPoint: 0,
			fillRadialGradientEndRadius: radius,
			fillRadialGradientColorStops: [0, name.colors[0], 0.5, name.colors[1], 1, name.colors[2]],
			stroke: 'black',
			strokeWidth: 0
		});
		this.kind = name;
		this.bulletes = 0;
		this.waves = [];
		this.radiusFight = name.radiusFight;
	}

	fire(enemie) {
		let x1 = this.draw.getX();
		let y1 = this.draw.getY();
		let x2 = enemie.draw.getX();
		let y2 = enemie.draw.getY();
		this.bulletes = new Konva.Line({
			points: [x1, y1, x2, y2],
			stroke: this.kind.colors[0],
			strokeWidth: this.settings.laserWidth,
			lineCap: 'round',
			lineJoin: 'round'
		});
		this.bulletes.enemie = enemie;
		enemie.health -= this.settings.pentagonTpwerDamage;
	}
}
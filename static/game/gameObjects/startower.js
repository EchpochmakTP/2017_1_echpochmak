import Settings from '../settings.js'
import Konva from 'konva';

export default
class StarTower {
	constructor(name, x, y, radius) {
		this.settings = new Settings();
		this.draw = new Konva.Star({
			x: x,
			y: y,
			numPoints: 5,
			innerRadius: radius / 2,
			outerRadius: radius,
			fill: 'khaki',
			stroke: 'black',
			strokeWidth: 0,
		});
		this.kind = name;
		this.bulletes = [];
		this.waves = [];
		this.radiusFight = name.radiusFight;
	}

	fire(enemie) {
		let x1 = this.draw.getX();
		let y1 = this.draw.getY();
		let x2 = enemie.draw.getX();
		let y2 = enemie.draw.getY();
		this.bulletes.push(new Konva.Line({
			points: [x1, y1, x2, y2],
			stroke: this.kind.color,
			strokeWidth: this.settings.laserWidth,
			lineCap: 'round',
			lineJoin: 'round',
		}))
		enemie.health -= this.settings.starTowerDamage;
	}
}
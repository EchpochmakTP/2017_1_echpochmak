import Settings from '../settings.js'
import Konva from 'konva';

export default
class TowerWave {
	constructor(name, x, y, radius) {
		this.settings = new Settings();
		this.draw = new Konva.Circle({
			x: x,
			y: y,
			innerRadius: radius,
			outerRadius: radius + this.settings.waveWidth,
			stroke: 'black',
			strokeWidth: 0,
			fill: name.color
		});
		this.kind = name;
	}
}
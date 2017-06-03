import Settings from '../settings.js'
import Konva from 'konva';

export default
class TowerWave {
	constructor(name, x, y, radius) {
		this.settings = new Settings();
		this.draw = new Konva.Arc({
			x: x,
			y: y,
			innerRadius: radius,
			outerRadius: radius + this.settings.waveWidth,
			stroke: 'black',
			strokeWidth: 0,
			fill: name.color,
			opacity: 1,
			angle: 360,
			rotation: 0,
		});
		this.kind = name;
		this.new = true;
	}
}
import Settings from './settings.js'
import Konva from 'konva';

export default
class MessageBlock {
	constructor() {

		this.settings = new Settings;

		this.baseTextBlock = new Konva.Text({
			x: this.settings.messageX,
			y: this.settings.messageY,
			width: this.settings.messageXSize,
			text: 'Что делать?',
			fontFamily: 'Comic Sans MS',
			fontSize: 25,
			fill: 'black',
			padding: 15,
			align: 'center',
		});

		this.textBlock = new Konva.Text({
			x: this.settings.messageX,
			y: this.settings.messageY + this.baseTextBlock.getHeight(),
			width: this.settings.messageXSize,
			text: 'Время ставить башни',
			fontFamily: 'Comic Sans MS',
			fontSize: 20,
			fill: 'black',
			padding: 10,
			align: 'center',
		});

		this.draw = new Konva.Rect({
			x: this.settings.messageX,
			y: this.settings.messageY,
			width: this.settings.messageXSize,
			height: this.settings.messageYSize,
			fill: 'rgba(58, 183, 51, 0.82)',
			stroke: 'black',
			strokeWidth: 1,
			cornerRadius: 15
		});
	}

// status: 
// 'stayTowers';
// 'selectTower';
// 'selectVariant';
// 'wave'

	text(status) {
		switch (status) {
			case ('stayTowers'):
				this.text.getText('Время ставить башни на поле. Нажимайте на клетки, в которых хотите их поставить!');
				break;
			case ('selectTower'):
				this.text.getText('Время выбрать, какую из башен оставить на поле. Нажмите на башню, которую хотите оставить!');
				break;
			case ('selectVariant'):
				break;
		}
	}
}

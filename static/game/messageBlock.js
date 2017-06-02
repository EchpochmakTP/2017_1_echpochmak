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
			text: '...',
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

	text(status) {
		switch (status) {
			case ('stayTowers'):
				this.textBlock.text('Время ставить башни на поле. \n\nНажимайте на клетки, в которых хотите их поставить!');
				break;
			case ('selectTower'):
				this.textBlock.text('Время выбрать, какую из башен оставить на поле. \n\nНажмите на башню, которую хотите оставить!');
				break;
			case ('selectVariant'):
				this.textBlock.text('Время выбрать, что сделать с этой башней: оставить на поле или скомбинировать с другими. \n\nНажмите на одну из кнопок вокруг выбранной башни!');
				break;
			case ('wave'):
				this.textBlock.text('Монстры идут! \n\nВремя наблюдать, как ваши башни уничтожат их!');
				break;
		}
	}

	error() {
		const savedText = this.textBlock.text();
		this.textBlock.text('Вы не можете поставить башню здесь: она закроет единственный путь!');
		this.textBlock.fill('red');

		setTimeout(() => {
			this.textBlock.text(savedText);
			this.textBlock.fill('black');
		}, 3000)
	}
}

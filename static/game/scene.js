import Settings from './settings.js'

export default
class Scene {
	constructor() {
		this.state = {};
		this.settings = new Settings;
	}

	setState(state) {
		this.state = state;
	}

	render() {
		let stage = new Konva.Stage({
			container: 'konva',
			width : window.innerWidth,
			height : window.innerHeight
		});
		let layer = new Konva.Layer();

		for (let i = 0; i < this.settings.mapSize; i++){
			for (let j = 0; j < this.settings.mapSize; j++){
				// console.log(this.state.fields[i][j].field)
				layer.add(this.state.fields[i][j].field);
				if (this.state.fields[i][j].tower){
					layer.add(this.state.fields[i][j].tower.draw);
					//console.log(this.state.fields[i][j])
				};
				
			};
		};
		for (let i = 0; i < this.state.fieldsNewTower.length; i++){
			layer.add(this.state.fieldsNewTower[i].draw)
			console.log(this.state.fieldsNewTower.length)
		}

		for (let i = 0; i < this.state.variantRects.length; i++){
			layer.add(this.state.variantRects[i].draw);

		};
		//for (let i = 0; i < this.state.variantElements.length; i++){
		//	layer.add(this.state.variantElements[i]);
		//}
		for (let i = 0; i < this.state.variantsShow.length; i++){
			layer.add(this.state.variantsShow[i].draw);
		}
		for (let i = 0; i < this.state.enemies.length; i++){
			layer.add(this.state.enemies[i].draw);
		}

		for (let i = 0; i < this.state.fieldsWithTowers.length; i++){
			for (let j = 0; j < this.state.fieldsWithTowers[i].tower.bulletes.length; j++){
				layer.add(this.state.fieldsWithTowers[i].tower.bulletes[j])
			}
		}

		stage.add(layer);
	}

	testDraw() {
		let stage = new Konva.Stage({
			container: 'konva',
			width : window.innerWidth,
			height : window.innerHeight
		});
		let layer = new Konva.Layer();

		let circle = new Konva.Circle({
			x: this.settings.mapX + 50,
			y: this.settings.mapY + 50,
			radius: 50,
			stroke: 'black',
			strokeWidth: 0,
			fill: 'red'
		});

		layer.add(circle);

		stage.add(layer);
	}
}
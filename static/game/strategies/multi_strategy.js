import Settings from '../settings.js'
import Scene from '../scene.js'
import Monster from '../gameObjects/monster.js'
import CircleTower from '../gameObjects/circletower.js'
import PentagonTower from '../gameObjects/pentagontower.js'
import StarTower from '../gameObjects/startower.js'
import VariantBlock from '../variantBlock.js'
import Arrow from '../gameObjects/arrow.js'
import TowerWave from '../gameObjects/towerwave.js'
import Mediator from '../mediator.js'
import Events from '../events.js'
import WebSocketService from '../transport.js'

import Konva from 'konva'
import PF from 'pathfinding'

export default
class MultiplayerStrategy {
	constructor(ws) {
		this.ws = ws;
	}

	init() {

		console.log('multi_strategy');

		this.timer = 0;

		this.mediator = new Mediator();
		this.settings = new Settings();
		this.scene = new Scene();

		this.wave = 1;
		this.score = 0;

		this.betweenEnemies = 10;
		this.betweenBulles = 3;
		this.status = 'playerStep';
		this.fields = Array(this.settings.mapSize);
		this.variantRects = [];
		this.variantElements = [];
		this.fieldsWithCircles = [];
		this.fieldsWithPentagons = [];
		this.fieldsWithStars = [];
		this.variantsShow = [];
		this.enemies = [];
		this.throneHealth = this.settings.throneHealth;
		this.enemiesNumber = 0;
		this.path = [];
		this.fieldsNewTower = [];
		this.checkpoints = [];
		this.lastMap = Array(this.settings.mapSize);
		for (let i = 0; i < this.lastMap.length; i++) {
			this.lastMap[i] = "o" * 10
		}


		for (let i = 0; i < 4; i++) {
			this.variantRects[i] = new VariantBlock(i);
		}

		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++){
				this.variantElements.push(new CircleTower(
					this.settings.variantCircls[i][j],
					this.settings.variantsX + this.settings.variantsXSize * 0.1 * (j * 2 + 1),
					this.settings.variantsY + this.settings.variantsYSize * 0.5 + i * this.settings.betweenVariants,
					Math.min(this.settings.variantsYSize / 2 - 7, this.settings.variantsXSize / 10 - 2) 
				))
			}
			this.variantElements.push(new Arrow(i, 'inVariantBlocks'));
			this.variantElements.push(new PentagonTower(
				this.settings.pentagons[i],
				this.settings.variantsX + this.settings.variantsXSize * 0.9,
				this.settings.variantsY + this.settings.variantsYSize * 0.5 + i * this.settings.betweenVariants,
				Math.min(this.settings.variantsYSize / 2 - 7, this.settings.variantsXSize / 10 - 2) 
			))
		}

		for (let i = 0; i < 3; i++) {
			this.variantElements.push(new PentagonTower(
				this.settings.pentagons[i],
				this.settings.variantsX + this.settings.variantsXSize * 0.1 * (i * 2 + 1),
				this.settings.variantsY + this.settings.variantsYSize * 0.5 + 3 * this.settings.betweenVariants,
				Math.min(this.settings.variantsYSize / 2 - 7, this.settings.variantsXSize / 10 - 2) 
			))
		}
		this.variantElements.push(new Arrow(3, 'inVariantBlocks'));
		this.variantElements.push(new StarTower(
				this.settings.star,
				this.settings.variantsX + this.settings.variantsXSize * 0.9,
				this.settings.variantsY + this.settings.variantsYSize * 0.5 + 3 * this.settings.betweenVariants,
				Math.min(this.settings.variantsYSize / 2 - 7, this.settings.variantsXSize / 10 - 2) 
			))

		for (let i = 1; i < this.settings.checkpoints.length - 1; i++) {
			let arrow = new Arrow(i, 'checkpoints');
			this.checkpoints.push(arrow);
		}
		
		for (let i = 0; i < this.settings.mapSize; i++){
			this.fields[i] = Array(this.settings.mapSize);
		}
		
		for (let i = 0; i < this.settings.mapSize; i++){
			for (let j = 0; j < this.settings.mapSize; j++){
				this.fields[j][i] = {
					tower: 0,
					field: new Konva.Rect({
						x: this.settings.mapX + j * this.settings.fieldSize + j * 2,
						y: this.settings.mapY + i * this.settings.fieldSize + i * 2,
						width: this.settings.fieldSize,
						height: this.settings.fieldSize,
						fill: 'grey',
						stroke: 'black',
						strokeWidth: 2
					}),
					coordinates: [j, i],
				};
				if (!((i === 0) && ((j === 0) || (j === this.settings.mapSize - 1)) || (i === this.settings.mapSize - 1) && ((j === 0) || (j === this.settings.mapSize - 1)))) {
					this.fields[j][i]['field'].addEventListener('click', () => {this.onClickField.call(this, this.fields[j][i])});
					this.fields[j][i]['field'].addEventListener('tap', () => {this.onClickField.call(this, this.fields[j][i])});
					this.fields[j][i]['field'].addEventListener('mouseover', () => {this.onOverField.call(this, this.fields[j][i])});
					this.fields[j][i]['field'].addEventListener('mouseout', () => {this.onOutField.call(this, this.fields[j][i])});
				}

			};
		};
		this.fields[0][this.settings.mapSize - 1].field.setFill('DarkOliveGreen');
		this.fields[this.settings.mapSize - 1][0].field.setFill('DarkOliveGreen');
		
		this.newStones = 0;
		this.towers = {
			circleBlue: 0,
			circleRed: 0,
			circleGreen: 0,
			circleYellow: 0,
			circlePink: 0,
			circleSad: 0,
			pentagonRPS: 0,
			pentagonSBG: 0,
			pentagonGYR: 0,
			star: 0,
		};

		this.state = {};

		this.mediator.subscribe(Events.MULTIPLAYER_NEW_MAP_SNAPSHOT, this.generateTower.bind(this));
		this.mediator.subscribe(Events.NEW_WAVE_STARTED, this.gameWave.bind(this));
	}

	gameStep() {
		if (this.status === 'playerStep') {
			this.playerStep();
		} else {
			this.gameWave();
		}

		this.updateState();
		this.scene.setState(this.state);
		this.scene.render();
	}

	updateState() {
		this.state = {
			fields: this.fields,
			variantRects: this.variantRects,
			towers: this.towers,
			fieldsNewTower: this.fieldsNewTower,
			variantElements: this.variantElements,
			variantsShow: this.variantsShow,
			enemies: this.enemies,
			fieldsWithCircles: this.fieldsWithCircles,
			fieldsWithPentagons: this.fieldsWithPentagons,
			fieldsWithStars: this.fieldsWithStars,
			checkpoints: this.checkpoints,
		}
	}

	

	isAbleTower(place) {
		for (let i = 0; i < this.settings.checkpoints.length; i++){
			if (place.coordinates[0] == this.settings.checkpoints[i][0] && place.coordinates[1] == this.settings.checkpoints[i][1]) {
				return false;
			}
		}
		for (let i = 0; i < this.fieldsNewTower.length; i++) {
			let x = this.fieldsNewTower[i].coordinates[0];
			let y = this.fieldsNewTower[i].coordinates[1];
			this.fields[x][y].tower = 1;
		}
		this.fields[place.coordinates[0]][place.coordinates[1]].tower = 1;
		let path = this.findPath(this.settings.checkpoints);
		let points = [];
		for (let i = 0; i < this.settings.checkpoints.length; i++) {
			points.push(this.settings.checkpoints[i]);
		}
		let j = 0;
		for (let i = 0; (i < path.length) && (j < points.length); i++){
			if (path[i][0] == points[j][0] && path[i][1] == points[j][1]) {
				j++;
			}
		}
		for (let i = 0; i < this.fieldsNewTower.length; i++) {
			let x = this.fieldsNewTower[i].coordinates[0];
			let y = this.fieldsNewTower[i].coordinates[1];
			this.fields[x][y].tower = 0;
		}
		this.fields[place.coordinates[0]][place.coordinates[1]].tower = 0;
		if (j == points.length) {
			return true;
		}
		return false;
	}

	onClickField(field) {
		console.log(field.coordinates[0], field.coordinates[1]);
		this.ws.sendNewTower({
			x: field.coordinates[1],
			y: field.coordinates[0]
		})
	}
		//if (this.isAbleTower(field)){
		//	this.generateTower(field);
		//	this.variantsShow = [];
		//	this.variantRects.length = 4;
		//} else if (this.variantRects.length < 5) {
		//	let waveButton = new VariantBlock(4, "You cant stop monsters");
		//	this.variantRects.push(waveButton);
		//}	

	onOverField(field) {
	//	field.field.setStroke(this.isAbleTower(field) ? 'green' : 'red');
	}

	onOutField(field) {
	//	field.field.setStroke('black');	
	}

	onClickNewPentagon(field, kind, currentNewTower) {
		if (currentNewTower) {
			for (let i = 0; i < this.fieldsNewTower.length; i++) {
				let xCoord = this.fieldsNewTower[i]['coordinates'][0];
				let yCoord = this.fieldsNewTower[i]['coordinates'][1];
				let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				this.fields[xCoord][yCoord]['tower'] = new CircleTower(this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
				this.fields[this.fieldsNewTower[i].coordinates[0]][this.fieldsNewTower[i].coordinates[1]].field.setStroke('black');
			}
			this.fieldsNewTower = [];
			this.newStones = 0;
			this.status = 'Wave';
		}
		let x = field.coordinates[0];
		let y = field.coordinates[1];
		let xp = this.settings.mapX + x * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
		let yp = this.settings.mapY + y * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
		let deleteCircles = new Array(...kind.circles);
		for (let i = 0; i < deleteCircles.length; i++){
			if (deleteCircles[i] === (currentNewTower ? currentNewTower.kind.name : field.tower.kind.name)) {
				deleteCircles.splice(i, 1);
			}
		}
		for (let i = 0; i < this.fieldsWithCircles.length; i++) {
			let xCoord = this.fieldsWithCircles[i].coordinates[0];
			let yCoord = this.fieldsWithCircles[i].coordinates[1];
			if (xCoord === field.coordinates[0] && yCoord === field.coordinates[1]){
				this.fieldsWithCircles.splice(i, 1);
			}
		}
		this.fields[x][y].tower = new PentagonTower(kind, xp, yp, this.settings.fieldSize / 2 - 2);
		this.fieldsWithPentagons.push(field);
		this.fields[x][y].tower.draw.addEventListener('click', () => {this.onClickPentagon.call(this, this.fields[x][y])})
		for (let i = 0; i < this.fieldsWithCircles.length; i++){
			if (this.fieldsWithCircles[i].tower.kind.name === deleteCircles[0]){
				let xCoord = this.fieldsWithCircles[i].coordinates[0];
				let yCoord = this.fieldsWithCircles[i].coordinates[1];
				let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				this.fields[xCoord][yCoord].tower = new CircleTower(this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
				this.fieldsWithCircles.splice(i, 1);
				break;
			};
		};
		for (let i = 0; i < this.fieldsWithCircles.length; i++){
			if (this.fieldsWithCircles[i].tower.kind.name === deleteCircles[1]){
				let xCoord = this.fieldsWithCircles[i].coordinates[0];
				let yCoord = this.fieldsWithCircles[i].coordinates[1];
				let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				this.fields[xCoord][yCoord].tower = new CircleTower(this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
				this.fieldsWithCircles.splice(i, 1);
				break;
			};
		};
		this.towers[kind.name]++;
		this.towers[deleteCircles[0]]--;
		this.towers[deleteCircles[1]]--;
		this.variantsShow = [];
		for (let i = 0; i < 4; i++) {
			this.variantRects[i].draw.setStroke('black');
			this.variantRects[i].draw.removeEventListener('click', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
			this.variantRects[i].draw.removeEventListener('tap', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
		}
	}

	onClickStayVariant(field, kind, currentNewTower){
		for (let i = 0; i < this.fieldsNewTower.length; i++){
			let xCoord = this.fieldsNewTower[i]['coordinates'][0];
			let yCoord = this.fieldsNewTower[i]['coordinates'][1];
			let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
			let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
			this.fields[xCoord][yCoord]['tower'] = new CircleTower(this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
			this.fields[this.fieldsNewTower[i].coordinates[0]][this.fieldsNewTower[i].coordinates[1]].field.setStroke('black');
		}
		this.fields[field.coordinates[0]][field.coordinates[1]]['tower'] = currentNewTower ;
		this.towers[currentNewTower.kind.name]++;
		this.fieldsWithCircles.push(field);
		this.fieldsNewTower = [];
		this.variantsShow = [];
		this.newStones = 0;
		this.status = 'Wave';
		for (let i = 0; i < 4; i++) {
			this.variantRects[i].draw.setStroke('black');
			this.variantRects[i].draw.removeEventListener('click', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
			this.variantRects[i].draw.removeEventListener('tap', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
			this.variantRects[i].isAble = false;
		}
	}

	onClickVariantRect(variantRect) {
		this.createVariants.call(this, variantRect.field);
	}

	onClickPentagon(field) {
		if (!(this.towers.pentagonRPS && this.towers.pentagonSBG && this.towers.pentagonGYR)) {
			return;
		}
		this.variantsShow = [];
		let star = new StarTower(
			'star',
			field.tower.draw.getX() - this.settings.fieldSize,
			field.tower.draw.getY(),
			this.settings.variantRadius
		);
		star.draw.addEventListener('click', () => {this.onClickNewStar.call(this, field, this.settings.star)});
		this.variantsShow.push(star);
	}

	onClickNewStar(field, kind) {
		let x = field.coordinates[0];
		let y = field.coordinates[1];
		let xp = this.settings.mapX + x * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
		let yp = this.settings.mapY + y * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
		let deletePentagons = new Array(...kind.pentagons);
		for (let i = 0; i < deletePentagons.length; i++){
			if (deletePentagons[i] == field.tower.kind.name) {
				deletePentagons.splice(i, 1);
			}
		}
		for (let i = 0; i < this.fieldsWithPentagons.length; i++) {
			let xCoord = this.fieldsWithPentagons[i].coordinates[0];
			let yCoord = this.fieldsWithPentagons[i].coordinates[1];
			if (xCoord === field.coordinates[0] && yCoord === field.coordinates[1]){
				this.fieldsWithPentagons.splice(i, 1);
			}
		}


		this.fields[x][y].tower = new StarTower(kind, xp, yp, this.settings.fieldSize / 2 - 2);
		this.fieldsWithStars.push(field);
		for (let i = 0; i < this.fieldsWithPentagons.length; i++){
			if (this.fieldsWithPentagons[i].tower.kind.name == deletePentagons[0]){
				let xCoord = this.fieldsWithPentagons[i].coordinates[0];
				let yCoord = this.fieldsWithPentagons[i].coordinates[1];
				let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				this.fields[xCoord][yCoord].tower = new CircleTower(this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
				this.fieldsWithPentagons.splice(i, 1);
				break;
			};
		};
		for (let i = 0; i < this.fieldsWithPentagons.length; i++){
			if (this.fieldsWithPentagons[i].tower.kind.name == deletePentagons[1]){
				let xCoord = this.fieldsWithPentagons[i].coordinates[0];
				let yCoord = this.fieldsWithPentagons[i].coordinates[1];
				let xPixel = this.settings.mapX + xCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				let yPixel = this.settings.mapY + yCoord * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2;
				this.fields[xCoord][yCoord].tower = new CircleTower(this.settings.stone, xPixel, yPixel, this.settings.fieldSize / 2 - 2);
				this.fieldsWithPentagons.splice(i, 1);
				break;
			};
		};
		this.towers[kind.name]++;
		this.towers[deletePentagons[0]]--;
		this.towers[deletePentagons[1]]--;
		this.variantsShow = [];

	}

	generateTower(arg) {
		let updates = [];
		for (let i = 0; i < arg.map.length; i++) {
			for (let j = 0; j < arg.map.length; j++) {
				if (arg.map[j][i] === 'o') {
					this.fields[i][j].tower = 0;
				} else if (this.fields[i][j].tower === 0){
					this.fields[i][j].tower = new CircleTower(
						this.settings.type[arg.map[j][i]],
						this.fields[i][j].field.getX() + this.settings.fieldSize / 2,
						this.fields[i][j].field.getY() + this.settings.fieldSize / 2,
						this.settings.fieldSize / 2 - 2
					)
					this.fields[i][j].tower.draw.addEventListener('click', () => {this.onClickField(this.fields[i][j])})
					this.fields[i][j].tower.draw.addEventListener('tap', () => {this.onClickField(this.fields[i][j])})
				} else if (arg.map[j][i] === '#') {
					this.fields[i][j].tower = new CircleTower(
						this.settings.stone,
						this.fields[i][j].field.getX() + this.settings.fieldSize / 2,
						this.fields[i][j].field.getY() + this.settings.fieldSize / 2,
						this.settings.fieldSize / 2 - 2
					)
				} else if (arg.map[j][i] === 'z') {
					this.fields[i][j].tower = new StarTower(
						this.settings.star,
						this.fields[i][j].field.getX() + this.settings.fieldSize / 2,
						this.fields[i][j].field.getY() + this.settings.fieldSize / 2,
						this.settings.fieldSize / 2 - 2
					)
					this.fields[i][j].tower.draw.addEventListener('click', () => {this.onClickField(this.fields[i][j])})
					this.fields[i][j].tower.draw.addEventListener('tap', () => {this.onClickField(this.fields[i][j])})
				}
				else if (this.fields[i][j].tower.kind != this.settings.type[arg.map[j][i]]) {
					this.fields[i][j].tower = new CircleTower(
						this.settings.type[arg.map[j][i]],
						this.fields[i][j].field.getX() + this.settings.fieldSize / 2,
						this.fields[i][j].field.getY() + this.settings.fieldSize / 2,
						this.settings.fieldSize / 2 - 2
					)
					this.fields[i][j].tower.draw.addEventListener('click', () => {this.onClickField(this.fields[i][j])})
					this.fields[i][j].tower.draw.addEventListener('tap', () => {this.onClickField(this.fields[i][j])})
				}
			}
		}
		this.updateState();
		this.scene.setState(this.state);
		this.scene.render();
	}

	createVariants(field) {
		this.variantsShow = [];

		let currentNewTower;
		let variantStay;
		this.variantsShow = [];
		for (let i = 0; i < this.fieldsNewTower.length; i++) {
			if ((field['field'].getX() + this.settings.fieldSize / 2 == this.fieldsNewTower[i].draw.getX()) && (field['field'].getY() + this.settings.fieldSize / 2 == this.fieldsNewTower[i].draw.getY()) && (this.newStones >= this.settings.numberTowersInStep)) {
				currentNewTower = this.fieldsNewTower[i];
				variantStay = new CircleTower(
					currentNewTower['kind'],
					this.settings.variantX,
					this.settings.variantY,
					this.settings.variantRadius
				);
			};
		};
		if (currentNewTower){
			this.towers[currentNewTower.kind.name]++;
			this.fields[field.coordinates[0]][field.coordinates[1]]['tower'] = currentNewTower;
		}
		let variants = this.listVariants(field);
		if (currentNewTower){
			this.towers[currentNewTower.kind.name]--;
			this.fields[field.coordinates[0]][field.coordinates[1]]['tower']['tower'] = 0
		}
		let alfa = 6.28 / (variants.length + 1);
		let beta = alfa;
		let variantX = field['field'].getX() + this.settings.fieldSize / 2 - this.settings.fieldSize;
		let variantY = field['field'].getY() + this.settings.fieldSize / 2;
		for (let i = 0; i < variants.length; i++){
			let variant = new PentagonTower(
				variants[i],
				variantX,
				variantY,
				this.settings.variantRadius
			);
			let cNewTower = currentNewTower ? currentNewTower : undefined;
			variant.draw.addEventListener('click', () => {this.onClickNewPentagon.call(this, field, variant.kind, cNewTower)});
			variant.draw.addEventListener('tap', () => {this.onClickNewPentagon.call(this, field, variant.kind, cNewTower)});
			variantX = field['field'].getX() + this.settings.fieldSize / 2 - Math.cos(beta) * this.settings.fieldSize;
			variantY = field['field'].getY()  + this.settings.fieldSize / 2 - Math.sin(beta) * this.settings.fieldSize;
			beta = beta + alfa;
			this.variantsShow.push(variant);
		}
		if (currentNewTower){
			variantStay = new CircleTower(
				currentNewTower.kind,
				variantX,
				variantY,
				this.settings.variantRadius
			);
			variantStay.draw.addEventListener('click', () => {this.onClickStayVariant.call(this, field, variantStay.kind, currentNewTower)});
			variantStay.draw.addEventListener('tap', () => {this.onClickStayVariant.call(this, field, variantStay.kind, currentNewTower)});
			this.variantsShow.push(variantStay);
		};
	}

	listVariants(field) {
		let variants = [];
		if (((this.towers['circleRed'] > 0) && (this.towers['circlePink'] > 0) && (this.towers['circleSad'] > 0)) && (!field || (field.tower.kind == this.settings.circleRed) || (field.tower.kind == this.settings.circlePink) || (field.tower.kind == this.settings.circleSad))){
		variants.push(this.settings.pentagonRPS);
		};
		if (((this.towers['circleSad'] > 0) && (this.towers['circleBlue'] > 0) && (this.towers['circleGreen'] > 0)) && (!field || (field.tower.kind == this.settings.circleSad) || (field.tower.kind == this.settings.circleBlue) || (field.tower.kind == this.settings.circleGreen))){
			variants.push(this.settings.pentagonSBG);
		};
		if (((this.towers['circleGreen'] > 0) && (this.towers['circleYellow'] > 0) && (this.towers['circleRed'] > 0)) && (!field || (field.tower.kind == this.settings.circleGreen) || (field.tower.kind == this.settings.circleYellow) || (field.tower.kind == this.settings.circleRed))){
			variants.push(this.settings.pentagonGYR);
		};
		return variants;
	}

	playerStep() {
		for (let i = 0; i < this.fieldsNewTower.length; i++) {
			if (this.fieldsNewTower[i].numberChangesColors > 1) {
				if (this.fieldsNewTower[i].numberChangesColors % 4 === 0) {
					let color = this.settings.circles[Math.floor(Math.random() * this.settings.circles.length)].color;
					this.fieldsNewTower[i].draw.setFill(color);
				}
				this.fieldsNewTower[i].numberChangesColors--;
			} else if (this.fieldsNewTower[i].numberChangesColors === 1) {
				let endColor = this.fieldsNewTower[i].kind.color;
				this.fieldsNewTower[i].draw.setFill(endColor);
				this.fieldsNewTower[i].numberChangesColors--;
				let x = this.fieldsNewTower[i].coordinates[0];
				let y = this.fieldsNewTower[i].coordinates[1];
				this.fieldsNewTower[i].draw.addEventListener('click', () => { this.createVariants.call(this, this.fields[x][y]) } ); 
			}
		}
	}

	gameWave(arg) {

		this.path = arg.route;
  
		for (let i = 0; i < this.settings.mapSize; i++){
			for (let j = 0; j < this.settings.mapSize; j++){
				if (this.fields[i][j].tower === 0) {
					this.fields[i][j]['field'].removeEventListener('click', () => {this.onClickField.call(this, this.fields[i][j])});
					this.fields[i][j]['field'].removeEventListener('tap', () => {this.onClickField.call(this, this.fields[i][j])});
					this.fields[i][j]['field'].removeEventListener('mouseover', () => {this.onOverField.call(this, this.fields[i][j])});
					this.fields[i][j]['field'].removeEventListener('mouseout', () => {this.onOutField.call(this, this.fields[i][j])});
				}
			}
		}

		if (this.enemiesNumber < this.settings.numberMonstersInWave) {
			if (this.betweenEnemies > 10) {
				let monster = new Monster(this.settings.triangl, this.enemiesNumber);
				monster.health += this.settings.addHPInWave * (this.wave - 1);
				this.enemies.push(monster);
				this.betweenEnemies = 0;
				this.enemiesNumber++;
			} else {
				this.betweenEnemies++;
			}
		}

		for (let i = 0; i < this.fieldsWithCircles.length; i++){
			if ((this.fieldsWithCircles[i].tower.waves.length === 0) || (this.fieldsWithCircles[i].tower.waves[length - 1].draw.getRadius() > this.settings.circleWaveMinRadius)) {
				let wave = new TowerWave(
					this.fieldsWithCircles[i].tower.kind,
					this.fieldsWithCircles[i].tower.draw.getX(),
					this.fieldsWithCircles[i].tower.draw.getY(),
					this.fieldsWithCircles[i].tower.draw.getRadius()
				)
				this.fieldsWithCircles[i].tower.waves.push(wave);
			}
			if (this.fieldsWithCircles[i].tower.waves[0].draw.getRadius() > this.settings.circleWaveMaxRadius) {
				this.fieldsWithCircles[i].tower.waves.unshift();
			}
			for (let j = 0; j < this.fieldsWithCircles[i].tower.waves.length; j++) {
				let oldInnerRadius = this.fieldsWithCircles[i].tower.waves[j].draw.getInnerRadius()
				let oldOuterRadius = this.fieldsWithCircles[i].tower.waves[j].draw.getOuterRadius()
				this.fieldsWithCircles[i].tower.waves[j].draw.setInnerRadius(oldInnerRadius + 2);
				this.fieldsWithCircles[i].tower.waves[j].draw.setOuterRadius(oldOuterRadius + 2);
  			}
		}

		for (let i = 0; i < this.enemies.length; i++) {
			let color = this.enemies[i].kind.color;
			this.enemies[i].draw.setFill(color);
			if (this.enemies[i].killed) {
				this.enemies.splice(i, 1);
				this.score++;
				this.mediator.emit(Events.GET_SCORE, {
					score: this.score
				})
  			}
		}

		for (let i = 0; i < this.enemies.length; i++) {
			for (let j = 0; j < arg.enemyDamages.length; j++) {
				if ((this.enemies[i].number === arg.enemyDamages[j].enemy.number) && (Math.abs(this.enemies[i].draw.getX() - arg.enemyDamages[j].coordinateX) < 10) && (Math.abs(this.enemies[i].draw.getY() - arg.enemyDamages[j].coordinateY) < 10)) {
					this.enemies[i].paintRed();
					this.enemies[i].killed = arg.enemyDamages[j].enemy.dead;
  				}
  			}
  		}

		for (let i = 0; i < this.enemies.length; i++) {
			let place = this.path[this.enemies[i].numberTurns];
			let distX = -this.enemies[i].draw.getX() + (this.settings.mapX + place[0] * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2);
			let distY = -this.enemies[i].draw.getY() + (this.settings.mapY + place[1] * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2);

			if (Math.abs(distX) < this.enemies[i].kind.size && Math.abs(distY) < this.enemies[i].kind.size){
				this.enemies[i].numberTurns++;
				continue;
			}

			let stepX = this.settings.monsterStep / Math.pow(1 + Math.pow(distY/distX, 2), 0.5) * Math.abs(distX) / distX;
			let stepY = Math.pow(this.settings.monsterStep * this.settings.monsterStep - stepX * stepX, 0.5) * Math.abs(distY) / distY;
			this.enemies[i].draw.setX(this.enemies[i].draw.getX() + stepX);
			this.enemies[i].draw.setY(this.enemies[i].draw.getY() + stepY);
		}

		for (let i = 0; i < this.enemies.length; i++) {
			if (this.enemies[i].numberTurns >= this.path.length) {
				this.enemies.splice(i, 1);
				i--;
				let damage = this.settings.damage + this.settings.addDamageInWave * (this.wave - 1);
				this.throneHealth -= damage;
				this.mediator.emit(Events.THRONE_DAMAGE, {
					health: (this.throneHealth > 0 ? this.throneHealth : 0)
				})
				if (this.throneHealth <= 0) {
					this.mediator.emit(Events.GAME_FINISHED, {
						score: this.score,
						death: true
					});
				}
			}
		}

		if ((this.enemies.length === 0) && (this.enemiesNumber >= this.settings.numberMonstersInWave)) {
			this.status = 'playerStep';
			this.wave++;

			this.enemiesNumber = 0;
			for (let i = 0; i < this.settings.mapSize; i++){
				for (let j = 0; j < this.settings.mapSize; j++){
					if (this.fields[i][j].tower === 0) {
						this.fields[i][j]['field'].addEventListener('click', () => {this.onClickField.call(this, this.fields[i][j])});
						this.fields[i][j]['field'].addEventListener('tap', () => {this.onClickField.call(this, this.fields[i][j])});
						this.fields[i][j]['field'].addEventListener('mouseover', () => {this.onOverField.call(this, this.fields[i][j])});
						this.fields[i][j]['field'].addEventListener('mouseout', () => {this.onOutField.call(this, this.fields[i][j])});
					}
				}
			}
			for (let i = 0; i < this.fieldsWithCircles.length; i++){
				this.fieldsWithCircles[i].tower.waves = [];
			}
			for (let i = 0; i < this.fieldsWithPentagons.length; i++){
				this.fieldsWithPentagons[i].tower.waves = [];
			}
			for (let i = 0; i < this.fieldsWithStars.length; i++){
				this.fieldsWithStars[i].tower.waves = [];
			}
			this.path = [];
		}
	}
}
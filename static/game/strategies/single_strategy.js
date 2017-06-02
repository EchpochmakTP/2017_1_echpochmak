import Settings from '../settings.js'
import Scene from '../scene.js'
import Monster from '../gameObjects/monster.js'
import CircleTower from '../gameObjects/circletower.js'
import PentagonTower from '../gameObjects/pentagontower.js'
import StarTower from '../gameObjects/startower.js'
import VariantBlock from '../variantBlock.js'
import Arrow from '../gameObjects/arrow.js'
import Mediator from '../mediator.js'
import Events from '../events.js'
import MessageBlock from '../messageBlock.js'

import Konva from 'konva'
import PF from 'pathfinding'

export default
class SingleStrategy {
	
	constructor() {

	}

	init() {

		console.log('single_strategy');

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
		this.fieldsWith = [];
		this.variantsShow = [];
		this.enemies = [];
		this.throneHealth = this.settings.throneHealth;
		this.enemiesNumber = 0;
		this.path = [];
		this.fieldsNewTower = [];
		this.checkpoints = [];
		this.message = new MessageBlock();

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

		this.fieldsWith = [];

		this.state = {};

		this.message.text('stayTowers');

		//this.fields[3][4].tower = new StarTower(
		//	this.settings.star,
		//	3 * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2 + this.settings.mapX,
		//	4 * (this.settings.fieldSize + 2) + this.settings.fieldSize / 2 + this.settings.mapY,
		//	this.settings.fieldSize / 2 - 2
		//)
//
		//this.fieldsWithStars.push(this.fields[3][4]);
	}

	gameStep() {
		if (this.status === 'playerStep') {
			this.playerStep();
		} else {
			this.message.text('wave');
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
			fieldsWith: this.fieldsWith,
			checkpoints: this.checkpoints,
			message: this.message
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
		this.message.text('stayTowers');
		if (this.isAbleTower(field)){
			this.generateTower(field);
			this.variantsShow = [];
			this.variantRects.length = 4;
		} else if (this.variantRects.length < 5) {
			this.message.error();
		}		
	}

	onOverField(field) {
		field.field.setStroke(this.isAbleTower(field) ? 'green' : 'red');
	}

	onOutField(field) {
		field.field.setStroke('black');	
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
		this.message.text('selectVariant');
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
		this.message.text('selectVariant');
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

	generateTower(field) {

		let circlePro = this.settings.circles[Math.floor(Math.random() * this.settings.circles.length)]

		let circle = new CircleTower(
			circlePro, 
			field['field'].getX() + this.settings.fieldSize / 2,
			field['field'].getY() + this.settings.fieldSize / 2,
			this.settings.fieldSize / 2 - 2
		);
		field.field.setStroke('black');
		field['field'].removeEventListener('click', () => {this.onClickField.call(this, field)});
		field['field'].removeEventListener('tap', () => {this.onClickField.call(this, field)});
		field['field'].removeEventListener('mouseover', () => {this.onOverField.call(this, field)});
		field['field'].removeEventListener('mouseout', () => {this.onOutField.call(this, field)});

		circle.draw.addEventListener('click', () => { this.createVariants.call(this, field) } ); 
		circle.draw.addEventListener('tap', () => { this.createVariants.call(this, field) } ); 
		circle['coordinates'] = field['coordinates'];
		this.fieldsNewTower.push(circle);
		this.newStones++;

		if (this.newStones >= this.settings.numberTowersInStep) {
			
			this.message.text('selectTower');

			for (let i = 0; i < this.settings.mapSize; i++){
				for (let j = 0; j < this.settings.mapSize; j++){
					this.fields[i][j]['field'].removeEventListener('click', () => {this.onClickField.call(this, this.fields[i][j])});
					this.fields[i][j]['field'].removeEventListener('tap', () => {this.onClickField.call(this, this.fields[i][j])});
					this.fields[i][j]['field'].removeEventListener('mouseover', () => {this.onOverField.call(this, this.fields[i][j])});
					this.fields[i][j]['field'].removeEventListener('mouseout', () => {this.onOutField.call(this, this.fields[i][j])});
				}
			}
			for (let i = 0; i < this.fieldsNewTower.length; i++){
				let x = this.fieldsNewTower[i].coordinates[0];
				let y = this.fieldsNewTower[i].coordinates[1];
				this.fields[x][y].field.setStroke('green');
			}
			for (let j = 0; j < this.fieldsNewTower.length; j++) {
				this.towers[this.fieldsNewTower[j].kind.name]++;
				let variants = this.listVariants();
				for (let i = 0; i < variants.length; i++) {
					for (let s = 0; s < 4; s++) {
						for (let t = 0; t < 3; t++) {

							if ((variants[i].name == this.variantRects[s].kind.name) && (this.fieldsNewTower[j].kind.name == variants[i].circles[t])){
								this.variantRects[s].isAble = true;
								this.variantRects[s].field = this.fields[this.fieldsNewTower[j].coordinates[0]][this.fieldsNewTower[j].coordinates[1]]
							}
						}
					}
				}
				this.towers[this.fieldsNewTower[j].kind.name]--;
			}
			for (let i = 0; i < this.variantRects.length; i++) {
				if (this.variantRects[i].isAble) {
					this.variantRects[i].draw.setStroke('green');
					this.variantRects[i].draw.addEventListener('click', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
					this.variantRects[i].draw.addEventListener('tap', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
				}
			}
			for (let i = 0; i < 4; i++) {
				this.variantRects[i].isAble = false;
				this.variantRects[i].field = 0;
				this.variantRects[i].draw.setStroke('black');
				this.variantRects[i].draw.removeEventListener('click', () => {this.onClickVariantRect.call(this, this.variantRects[i])});
				this.variantRects[i].draw.removeEventListener('tap', () => {this.onClickVariantRect.call(this, this.variantRects[i])});

			}			
		}
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
		
		this.message.text('selectVariant');
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

	gameWave() {

		if (this.path.length === 0) {
			this.path = this.findPath(this.settings.checkpoints);
		}

		if (this.enemiesNumber < this.settings.numberMonstersInWave) {
			if (this.betweenEnemies > 10) {
				let monster = new Monster(this.settings.triangl);
				monster.health += this.settings.addHPInWave * (this.wave - 1);
				this.enemies.push(monster);
				this.betweenEnemies = 0;
				for (let i = 0; i < this.fieldsWithCircles.length; i++){
					this.fieldsWithCircles[i].tower.bulletes.push([]);
				}
				this.enemiesNumber++;
			} else {
				this.betweenEnemies++;
			}
		}

		for (let i = 0; i < this.fieldsWithCircles.length; i++){
			for (let j = 0; j < this.enemies.length; j++){
				let distY = this.enemies[j].draw.getY() - this.fieldsWithCircles[i].tower.draw.getY();
				let distX = this.enemies[j].draw.getX() - this.fieldsWithCircles[i].tower.draw.getX();
				if (Math.pow(distX * distX + distY * distY, 0.5) <= this.fieldsWithCircles[i].tower.radiusFight){
					if (this.betweenBulles >= 2) {
						this.fieldsWithCircles[i].tower.fire(j);
						this.betweenBulles = 0;
						break;	
					} else {
						this.betweenBulles++;
					}
					
				};
			};
			for (let j = 0; j < this.fieldsWithCircles[i].tower.bulletes.length; j++){
				for (let s = 0; s < this.fieldsWithCircles[i].tower.bulletes[j].length; s++){
					let distY = this.enemies[j].draw.getY() - this.fieldsWithCircles[i].tower.bulletes[j][s].getY();
					let distX = this.enemies[j].draw.getX() - this.fieldsWithCircles[i].tower.bulletes[j][s].getX();
					if (Math.abs(distX) < this.enemies[j].kind.size && Math.abs(distY) < this.enemies[j].kind.size){
						this.fieldsWithCircles[i].tower.bulletes[j].splice(s, 1);
						this.enemies[j].health -= this.settings.circleTowerDamage;
						continue;
					}
					let stepX = this.settings.bulletStep / Math.pow(1 + Math.pow(distY/distX, 2), 0.5) * Math.abs(distX) / distX;
					let stepY = Math.pow(this.settings.bulletStep * this.settings.bulletStep - stepX * stepX, 0.5) * Math.abs(distY) / distY;
					this.fieldsWithCircles[i].tower.bulletes[j][s].setX(this.fieldsWithCircles[i].tower.bulletes[j][s].getX() + stepX);
					this.fieldsWithCircles[i].tower.bulletes[j][s].setY(this.fieldsWithCircles[i].tower.bulletes[j][s].getY() + stepY);
				};
			};
		};

		for (let i = 0; i < this.fieldsWithPentagons.length; i++) {
			this.fieldsWithPentagons[i].tower.bulletes = 0;
			for (let j = 0; j < this.enemies.length; j++) {
				let distY = this.enemies[j].draw.getY() - this.fieldsWithPentagons[i].tower.draw.getY();
				let distX = this.enemies[j].draw.getX() - this.fieldsWithPentagons[i].tower.draw.getX();
				if (Math.pow(distX * distX + distY * distY, 0.5) <= this.fieldsWithPentagons[i].tower.radiusFight){
					this.fieldsWithPentagons[i].tower.fire(this.enemies[j]);
					break;
				}
			}
		}

		for (let i = 0; i < this.fieldsWithStars.length; i++) {
			this.fieldsWithStars[i].tower.bulletes = [];
			for (let j = 0; j < this.enemies.length; j++) {
				let distY = this.enemies[j].draw.getY() - this.fieldsWithStars[i].tower.draw.getY();
				let distX = this.enemies[j].draw.getX() - this.fieldsWithStars[i].tower.draw.getX();
				if (Math.pow(distX * distX + distY * distY, 0.5) <= this.fieldsWithStars[i].tower.radiusFight){
					this.fieldsWithStars[i].tower.fire(this.enemies[j]);
					break;
				}
			}
			for (let j = this.enemies.length - 1; j >= 0; j--) {
				let distY = this.enemies[j].draw.getY() - this.fieldsWithStars[i].tower.draw.getY();
				let distX = this.enemies[j].draw.getX() - this.fieldsWithStars[i].tower.draw.getX();
				if (Math.pow(distX * distX + distY * distY, 0.5) <= this.fieldsWithStars[i].tower.radiusFight){
					this.fieldsWithStars[i].tower.fire(this.enemies[j]);
					break;
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

			if (this.enemies[i].killed) {
				this.enemies.splice(i, 1);
				for (let j = 0; j < this.fieldsWithCircles.length; j++){
					this.fieldsWithCircles[j].tower.bulletes.splice(i, 1);
				}
				i--;
				continue;
			}

			if (this.enemies[i].health <= 0) {
				this.enemies[i].killedTics++;
				this.enemies[i].killed = true;
				this.enemies[i].paintRed();
				this.score++;
				this.mediator.emit(Events.GET_SCORE, {
					score: this.score
				})
			}
		}

		for (let i = 0; i < this.enemies.length; i++) {
			if (this.enemies[i].numberTurns >= this.path.length) {
				this.enemies.splice(i, 1);
				for (let s = 0; s < this.fieldsWithCircles.length; s++){
					this.fieldsWithCircles[s].tower.bulletes.splice(i, 1);
				}
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
			this.mediator.emit(Events.NEW_WAVE_STARTED, {
				wave: this.wave
			});
			this.message.text('stayTowers');

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
				this.fieldsWithCircles[i].tower.bulletes = [];
			}
			for (let i = 0; i < this.fieldsWithPentagons.length; i++){
				this.fieldsWithPentagons[i].tower.bulletes = 0;
			}
			for (let i = 0; i < this.fieldsWithStars.length; i++){
				this.fieldsWithStars[i].tower.bulletes = [];
			}
			this.path = [];
		}
	}

	findPath(checkpoints) {

		let matrix = Array(this.settings.mapSize);
		for (let i = 0; i < this.settings.mapSize; ++i) {
			matrix[i] = Array(this.settings.mapSize);
		}

		for (let i = 0; i < this.settings.mapSize; ++i) {
			for (let j = 0; j < this.settings.mapSize; ++j) {
				if (this.fields[i][j].tower && this.fields[i][j].tower !== 0) {
					matrix[j][i] = 1;
				} else {
					matrix[j][i] = 0;
				}
			}
		}

		const finder = new PF.BiAStarFinder({
			allowDiagonal: true,
			heuristic: PF.Heuristic.euclidean
		});

		let path = [];
		for (let i = 1; i < checkpoints.length; i++) {
			let subStart = checkpoints[i - 1];
			let subFinish = checkpoints[i];

			const grid = new PF.Grid(matrix);
			let subPath = finder.findPath(subStart[0], subStart[1], subFinish[0], subFinish[1], grid);

			path = path.concat(subPath);
		}

		return(path);
	}
}

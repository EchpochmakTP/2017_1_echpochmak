import Mediator from './mediator.js'
import Authorize from '../services/authorize.js'
import Events from './events.js'

export default
class WebSocketService {
	constructor() {
		this.mediator = new Mediator();
	}

	open() {
		this.authorize = new Authorize();

		this.ws = new WebSocket('wss://gem-td-back.herokuapp.com/game');

		this.ws.onopen = () => { 
			console.log('open');
			this.sendObject({ 
				type: 'techpark.game.events.JoinGame',
				content: {}
			});
		};

		this.ws.onerror = (error) => {
			console.log('error ', error.message);
			this.mediator.emit(Events.MULTIPLAYER_CONNECTION_REFUSED);
		};

		this.ws.onclose = (event) => {
			console.log('close');
			console.log('code: ', event.code);
			console.log('reason: ', event.reason);
			if (event.code !== 1005) {
				this.mediator.emit(Events.MULTIPLAYER_CONNECTION_REFUSED);
			}
		};

		this.ws.onmessage = (event) => {
			const object = this.parseMessage(event.data);

			console.log(object);

			this.parseObject(object);
		};
	}

	close() {
		this.ws.close();
	}

	//sendNewTower(coord) {
	//	this.sendObject({
	//		type: 'techpark.game.base.ClientSnap',
	//		content: {
	//			square: {
	//				x: coord.x,
	//				y: coord.y
	//			},
	//		}
	//	});
	//}

	sendNewTower(coord, kind) {
		this.sendObject({
			type: 'techpark.game.base.ClientSnap',
			content: {
				square: {
					x: coord.x,
					y: coord.y,
					comb: kind
				},
			}
		});
	}

	sendObject(message) {
		if (message.content) {
			message.content = JSON.stringify(message.content);
		}
		message = JSON.stringify(message);
		this.ws.send(message);
	}

	parseMessage(message) {
		message = JSON.parse(message);
		if (message.content) {
			message.content = JSON.parse(message.content);
		}
		return message;
	}

	parseObject(object) {
		if (object.type === 'techpark.game.request.InitGame$Request') {
			const payers = object.content.players;
			let ally = 'ally';
			for (let player of payers) {
				if (player !== this.authorize.user.username) {
					ally = player;
				}
			}
			this.mediator.emit(Events.MULTIPLAYER_GAME_START, {ally})

		} else if (object.type === 'techpark.game.base.ServerMazeSnap') {
			const obj = {};
			obj.map = object.content.map;
			obj.combinations = object.content.combinations;
			if (object.content.user === this.authorize.user.username) {
				obj.myself = true;
			} else {
				obj.myself = false;
			}
			this.mediator.emit(Events.MULTIPLAYER_NEW_MAP_SNAPSHOT, obj);
			
		} else if (object.type === 'techpark.game.base.ServerWaveSnap') {
			let obj = {};
			obj.enemyDamages = object.content.enemyDamages;
			obj.route = object.content.route;
			obj.points = object.content.points;
			obj.throneDamages = object.content.throneDamages;
			obj.wave = object.content.wave;
			this.mediator.emit(Events.MULTIPLAYER_NEW_WAVE_STARTED, obj);
		}
	}
}
import SingleStrategy from './strategy.js'
import Mediator from './mediator.js'
import Events from './events.js'

export default
class GameManager {
	constructor(strategy) {
		this.mediator = new Mediator();

		this.mediator.subscribe(Events.PLAY_NEW_GAME, this.start.bind(this));
		this.mediator.subscribe(Events.PLAY_AGAIN, this.start.bind(this));
		this.mediator.subscribe(Events.GAME_FINISHED, this.end.bind(this));
		this.mediator.subscribe(Events.QUIT_CONFIRMED, this.end.bind(this));
	}

	gameLoop() {
		this.strategy.gameStep();
		if (this.play) {
			this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
		}
	}

	start() {
		this.strategy = new SingleStrategy();
		this.play = true;
		this.requestID = requestAnimationFrame(this.gameLoop.bind(this));
	}

	end() {
		this.play = false;
	}
}
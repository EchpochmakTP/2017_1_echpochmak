'use strict';

import BaseView from '../baseview.js'
import BaseBlock from '../../components/BaseBlock/baseblock.js'
import SinglePlayerStart from './start.js'
import SinglePlayerGame from './game.js'
import SingleStrategy from '../../game/strategies/single_strategy.js'
import GameManager from '../../game/manager.js'
import Mediator from '../../game/mediator.js'
import Router from '../../modules/router.js'
import Events from '../../game/events.js'

export default
class SinglePlayer extends BaseView {
	constructor() {
		super('div', {
			class: 'singleplayer'
		});
		
		this.get().removeChild(this.back.get());

		// this.startSubView = new SinglePlayerStart();
		this.gameSubView = new SinglePlayerGame();

		this.router = new Router();
		this.mediator = new Mediator();

		this.render();

		// this.mediator.subscribe(Events.GAME_START, this.onStartGame.bind(this));
		this.mediator.subscribe(Events.QUIT_CONFIRMED, this.onExit.bind(this));
		this.mediator.subscribe(Events.EXIT_TO_MENU, this.onExit.bind(this));
	}

	onStartGame() {
		this.gameManager = new GameManager();
		this.gameManager.setStrategy(new SingleStrategy());

		// this.get().removeChild(this.startSubView.get());
		this.get().appendChild(this.gameSubView.get());
		
		this.mediator.emit(Events.PLAY_NEW_GAME);
	}

	// onQuitConfirm() {
	// 	this.get().removeChild(this.gameSubView.get());
	// 	this.get().appendChild(this.startSubView.get());
	// }

	onExit() {
		this.get().removeChild(this.gameSubView.get());
		// this.get().appendChild(this.startSubView.get());
		this.router.go('/');
	}

	render() {
		// this.get().appendChild(this.startSubView.get());
	}

	loginSwitch(user) {
		this.gameSubView.loginSwitch(user);
	}

	unloginSwitch(user) {
		this.gameSubView.unloginSwitch(user);
	}

	show() {
		super.show();
		this.onStartGame();
	}

	hide() {
		super.hide();
		this.gameSubView.reset();
	}
}

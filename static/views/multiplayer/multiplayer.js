'use strict';

import BaseView from '../baseview.js'
import BaseBlock from '../../components/BaseBlock/baseblock.js'
import MultiPlayerStart from './start.js'
import MultiPlayerGame from './game.js'
import MultiStrategy from '../../game/strategies/multi_strategy.js'
import GameManager from '../../game/manager.js'
import Mediator from '../../game/mediator.js'
import Router from '../../modules/router.js'
import Events from '../../game/events.js'
import WebSocketService from '../../game/transport.js'

export default
class MultiPlayer extends BaseView {
	constructor() {
		super('div', {
			class: 'multiplayer'
		});
		
		this.get().removeChild(this.back.get());

		this.startSubView = new MultiPlayerStart();
		this.gameSubView = new MultiPlayerGame()

		this.router = new Router();
		this.mediator = new Mediator();

		this.render();

		this.mediator.subscribe(Events.MULTIPLAYER_SEARCH, this.onSearch.bind(this));
		this.mediator.subscribe(Events.MULTIPLAYER_GAME_START, this.onStartGame.bind(this));
		this.mediator.subscribe(Events.MULTIPLAYER_QUIT_CONFIRMED, this.onQuitConfirm.bind(this));
		this.mediator.subscribe(Events.MULTIPLAYER_EXIT_TO_MENU, this.onExit.bind(this));
		this.mediator.subscribe(Events.MULTIPLAYER_PLAY_AGAIN, this.onPlayAgain.bind(this));
	}

	onSearch() {
		this.ws = new WebSocketService();
		this.ws.open();
		console.log('la');
	}

	onStartGame(args) {
		this.gameManager = new GameManager();
		this.gameManager.setStrategy(new MultiStrategy(this.ws));

		this.get().removeChild(this.startSubView.get());
		this.get().appendChild(this.gameSubView.get());
		
		console.log(args.ally);

		this.mediator.emit(Events.PLAY_NEW_GAME);
	}

	onPlayAgain() {
		this.ws.close();
		this.get().removeChild(this.gameSubView.get());
		this.get().appendChild(this.startSubView.get());
		this.mediator.emit(Events.MULTIPLAYER_SEARCH);
	}

	onQuitConfirm() {
		this.ws.close();
		this.get().removeChild(this.gameSubView.get());
		this.get().appendChild(this.startSubView.get());
	}

	onExit() {
		this.ws.close();
		this.get().removeChild(this.gameSubView.get());
		this.get().appendChild(this.startSubView.get());	
		this.router.go('/');
	}

	render() {
		this.get().appendChild(this.startSubView.get());
	}

	loginSwitch(user) {
		this.gameSubView.loginSwitch(user);
		this.startSubView.loginSwitch(user);
		this.mediator.emit(Events.MULTIPLAYER_SEARCH);
	}

	unloginSwitch(user) {
		this.gameSubView.unloginSwitch(user);
		this.startSubView.unloginSwitch(user);
	}

	// show() {
	// 	super.show();
	// 	this.mediator.emit(Events.MULTIPLAYER_SEARCH);
	// }
}

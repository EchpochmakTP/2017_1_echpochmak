'use strict';

import BaseView from '../baseview.js'
import BaseBlock from '../../components/BaseBlock/baseblock.js'
import Mediator from '../../game/mediator.js'
import Events from '../../game/events.js'

export default
class MultiPlayerStart extends BaseView {
	constructor() {
		super('div', {
			class: 'multiplayer__start'
		});

		this.mediator = new Mediator();

		this.padd = new BaseBlock('div', {
			class: 'padd'
		});
		this.list = new BaseBlock('div', {
			class: 'list',
			align: 'center'
		});
		this.message = new BaseBlock('div');
		this.message.get().innerHTML = 'Поиск союзника...'

		this.render();
		this.makeListeners();
	}

	makeListeners() {

		this.mediator.subscribe(Events.MULTIPLAYER_GAME_START, () => {
			this.message.get().innerHTML = 'Поиск союзника...';
		})

		this.mediator.subscribe(Events.MULTIPLAYER_CONNECTION_REFUSED, () => {
			this.message.get().innerHTML = 'Не удалось установить соединение';
		})

		this.mediator.subscribe(Events.MULTIPLAYER_PLAY_AGAIN, () => {
			this.message.get().innerHTML = 'Поиск союзника...';
		})
	}

	render() {
		this.get().appendChild(this.padd.get());
		this.padd.get().appendChild(this.list.get());
		this.list.get().appendChild(this.message.get());
		// this.list.get().appendChild(this.newGame.get());
	}
}

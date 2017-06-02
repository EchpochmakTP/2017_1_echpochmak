// 'use strict';

// import BaseView from '../baseview.js'
// import BaseBlock from '../../components/BaseBlock/baseblock.js'
// import Mediator from '../../game/mediator.js'
// import Events from '../../game/events.js'

// export default
// class SinglePlayerStart extends BaseView {
// 	constructor() {
// 		super('div', {
// 			class: 'singleplayer__start'
// 		});

// 		this.mediator = new Mediator();

// 		this.padd = new BaseBlock('div', {
// 			class: 'padd'
// 		});
// 		this.list = new BaseBlock('div', {
// 			class: 'list',
// 			align: 'center'
// 		});
// 		this.newGame = new BaseBlock('button', {
// 			align: 'center'
// 		});
// 		this.newGame.get().innerHTML = 'Начать игру';

// 		this.render();
// 		this.makeListeners();
// 	}

// 	makeListeners() {
// 		this.newGame.on('click', (event) => {
// 			event.preventDefault();
// 			this.mediator.emit(Events.GAME_START);
// 		})
// 	}

// 	render() {
// 		this.get().appendChild(this.padd.get());
// 		this.padd.get().appendChild(this.list.get());
// 		this.list.get().appendChild(this.newGame.get());
// 	}
// }

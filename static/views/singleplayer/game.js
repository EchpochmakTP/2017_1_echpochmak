'use strict';

import BaseView from '../baseview.js'
import BaseBlock from '../../components/BaseBlock/baseblock.js'
import Mediator from '../../game/mediator.js'
import Events from '../../game/events.js'
import Authorize from '../../services/authorize.js'

export default
class SinglePlayerGame extends BaseView {
	constructor() {
		super('div', {
			class: 'singleplayer__game'
		});
		
		this.mediator = new Mediator();

		this.get().removeChild(this.back.get());

		this.leftBar = new BaseBlock('div', {
			class: 'col-xs-3 col-sm-3 col-md-3 col-lg-3 left-bar',
			align: 'center'
		});
		this.gameField = new BaseBlock('div', {
			class: 'col-xs-6 col-sm-6 col-md-6 col-lg-6 game-field',
			id: 'game-field'
		});
		this.hints = new BaseBlock('div', {
			class: 'col-xs-3 col-sm-3 col-md-3 col-lg-3 hints-field',
			id: 'hints-field'
		});

		this.createLeftBar();
		this.createQuitWindow();
		this.createFinishWindow();

		this.render();
		this.makeListeners();
	}

	createLeftBar() {
		this.quitBlock = new BaseBlock('div', {
			class: 'left-bar__quit',
			align: 'center'
		});
		this.quitButton = new BaseBlock('button');
		this.quitButton.get().innerHTML = 'Выйти';

		this.userBlock = new BaseBlock('div', {
			class: 'left-bar__user',
			align: 'center'
		});
		this.userBlock_title = new BaseBlock('b');
		this.userBlock_text = new BaseBlock('span');
		this.userBlock_title.get().innerHTML = 'Игрок: '
		
		this.scoreBlock = new BaseBlock('div', {
			class: 'left-bar__score'
		});
		this.scoreBlock_title = new BaseBlock('b');
		this.scoreBlock_text = new BaseBlock('span');
		this.scoreBlock_title.get().innerHTML = 'Результат: '
		this.scoreBlock_text.get().innerHTML = '0'
		
		this.waveBlock = new BaseBlock('div', {
			class: 'left-bar__wave'
		})
		this.waveBlock_title = new BaseBlock('b');
		this.waveBlock_text = new BaseBlock('span');
		this.waveBlock_title.get().innerHTML = 'Волна: ';
		this.waveBlock_text.get().innerHTML = '1';

		this.HPBlock = new BaseBlock('div', {
			class: 'left-bar__HP'
		})
		this.HPBlock_title = new BaseBlock('b');
		this.HPBlock_text = new BaseBlock('span');
		this.HPBlock_title.get().innerHTML = 'HP: ';
		this.HPBlock_text.get().innerHTML = '100';
	}

	createQuitWindow() {
		this.quitConfirm = new BaseBlock('div', {
			class: 'game-window',
			align: 'center'
		})
		this.quitText = new BaseBlock('div', {
			class: 'game-window__text'
		})
		this.quitButtons = new BaseBlock('div', {
			class: 'game-window__buttons'
		})
		this.quitText.get().innerHTML = 'Вы уверены, что хотите выйти?';
		this.quitConfirmButton = new BaseBlock('a');
		this.quitConfirmButton.get().innerHTML = 'Выйти';
		this.quitCancelButton = new BaseBlock('button');
		this.quitCancelButton.get().innerHTML = 'Остаться';
	}

	createFinishWindow() {
		this.finishWindow = new BaseBlock('div', {
			class: 'game-window',
			align: 'center'
		})
		this.finishText = new BaseBlock('div', {
			class: 'game-window__text'
		})
		this.finishButtons = new BaseBlock('div', {
			class: 'game-window__buttons'
		})
		this.exitButton = new BaseBlock('a');
		this.exitButton.get().innerHTML = 'Выйти в меню';
		this.againButton = new BaseBlock('button');
		this.againButton.get().innerHTML = 'Начать сначала';
	}

	makeListeners() {

		this.mediator.subscribe(Events.GAME_FINISHED, (args) => {
			this.finishText.get().innerHTML = 'Игра окончена. </br> Ваш результат: ' + args.score;
			this.get().appendChild(this.finishWindow.get());
		})
		this.mediator.subscribe(Events.NEW_WAVE_STARTED, (args) => {
			this.waveBlock_text.get().innerHTML = args.wave;
		})
		this.mediator.subscribe(Events.GET_SCORE, (args) => {
			this.scoreBlock_text.get().innerHTML = args.score;
		})
		this.mediator.subscribe(Events.THRONE_DAMAGE, (args) => {
			this.HPBlock_text.get().innerHTML = args.health;
		})
		this.mediator.subscribe(Events.PLAY_AGAIN, () => {
			this.reset();
		})

		this.quitButton.on('click', () => {
			this.get().appendChild(this.quitConfirm.get());
			this.mediator.emit(Events.PAUSE);
		})

		this.quitCancelButton.on('click', () => {
			this.get().removeChild(this.quitConfirm.get());
			this.mediator.emit(Events.PLAY);
		})

		this.quitConfirmButton.on('click', () => {
			this.get().removeChild(this.quitConfirm.get());
			this.mediator.emit(Events.QUIT_CONFIRMED, {
				score: parseInt((this.scoreBlock_text.get().innerHTML))
			});
			this.reset();
		})

		this.exitButton.on('click', () => {
			this.get().removeChild(this.finishWindow.get());
			this.mediator.emit(Events.EXIT_TO_MENU);
			this.reset();
		})

		this.againButton.on('click', () => {
			this.get().removeChild(this.finishWindow.get());
			this.mediator.emit(Events.PLAY_AGAIN);
			this.reset();
		})
	}

	reset() {
		this.waveBlock_text.get().innerHTML = 1;
		this.scoreBlock_text.get().innerHTML = 0;
		this.HPBlock_text.get().innerHTML = 100;
	}

	render() {
		this.get().appendChild(this.leftBar.get());
		this.get().appendChild(this.gameField.get());
		this.get().appendChild(this.hints.get());

		this.leftBar.get().appendChild(this.quitBlock.get());
		this.leftBar.get().appendChild(this.userBlock.get());
		this.leftBar.get().appendChild(this.scoreBlock.get());
		this.leftBar.get().appendChild(this.waveBlock.get());
		this.leftBar.get().appendChild(this.HPBlock.get());

		this.userBlock.get().appendChild(this.userBlock_title.get());
		this.userBlock.get().appendChild(this.userBlock_text.get());
		this.scoreBlock.get().appendChild(this.scoreBlock_title.get());
		this.scoreBlock.get().appendChild(this.scoreBlock_text.get());
		this.waveBlock.get().appendChild(this.waveBlock_title.get());
		this.waveBlock.get().appendChild(this.waveBlock_text.get());
		this.HPBlock.get().appendChild(this.HPBlock_title.get());
		this.HPBlock.get().appendChild(this.HPBlock_text.get());
		
		this.quitBlock.get().appendChild(this.quitButton.get());

		this.quitConfirm.get().appendChild(this.quitText.get());
		this.quitConfirm.get().appendChild(this.quitButtons.get());
		this.quitButtons.get().appendChild(this.quitConfirmButton.get());
		this.quitButtons.get().appendChild(this.quitCancelButton.get());

		this.finishWindow.get().appendChild(this.finishText.get());
		this.finishWindow.get().appendChild(this.finishButtons.get());
		this.finishButtons.get().appendChild(this.exitButton.get());
		this.finishButtons.get().appendChild(this.againButton.get());
	}

	loginSwitch(user) {
		this.userBlock_text.get().innerHTML = user;
	}

	unloginSwitch(user) {
		this.loginSwitch(user);
	}
}

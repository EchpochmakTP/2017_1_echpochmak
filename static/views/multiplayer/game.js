'use strict';

import BaseView from '../baseview.js'
import BaseBlock from '../../components/BaseBlock/baseblock.js'
import Mediator from '../../game/mediator.js'
import Events from '../../game/events.js'
import Authorize from '../../services/authorize.js'

export default
class MultiPlayerGame extends BaseView {
	constructor() {
		super('div', {
			class: 'multiplayer__game'
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
		this.createConnectionRefusedWindow();

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
		this.userBlock_name1 = new BaseBlock('span');
		this.userBlock_sep = new BaseBlock('span');
		this.userBlock_name2 = new BaseBlock('span');
		this.userBlock_title.get().innerHTML = 'Игроки: <br>';
		this.userBlock_sep.get().innerHTML = ', ';
		
		this.scoreBlock = new BaseBlock('div', {
			class: 'left-bar__score'
		});
		this.scoreBlock_title = new BaseBlock('b');
		this.scoreBlock_text = new BaseBlock('span');
		this.scoreBlock_title.get().innerHTML = 'Результат: ';
		this.scoreBlock_text.get().innerHTML = '0';
		
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
		this.quitText.get().innerHTML = 'Точно выйти?';
		this.quitConfirmButton = new BaseBlock('button');
		this.quitConfirmButton.get().innerHTML = 'Точно выйти';
		this.quitCancelButton = new BaseBlock('button');
		this.quitCancelButton.get().innerHTML = 'Нет, не точно';
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
		this.exitButton = new BaseBlock('button');
		this.exitButton.get().innerHTML = 'Выйти в меню';
		this.againButton = new BaseBlock('button');
		this.againButton.get().innerHTML = 'Начать сначала';
	}

	createConnectionRefusedWindow() {
		this.CRWindow = new BaseBlock('div', {
			class: 'game-window',
			align: 'center'
		})
		this.CRText = new BaseBlock('div', {
			class: 'game-window__text'
		})
		this.CRButtons = new BaseBlock('div', {
			class: 'game-window__buttons'
		})
		this.CRexitButton = new BaseBlock('button');
		this.CRexitButton.get().innerHTML = 'Выйти в меню';
		this.CRagainButton = new BaseBlock('button');
		this.CRagainButton.get().innerHTML = 'Начать сначала';
	}

	reset() {
		this.waveBlock_text.get().innerHTML = 1;
		this.scoreBlock_text.get().innerHTML = 0;
		this.HPBlock_text.get().innerHTML = 100;
	}

	makeListeners() {

		this.mediator.subscribe(Events.MULTIPLAYER_GAME_START, (args) => {
			this.userBlock_name2.get().innerHTML = args.ally;
		})

		this.mediator.subscribe(Events.MULTIPLAYER_CONNECTION_REFUSED, () => {
			this.CRText.get().innerHTML = 'Соединение с сервером разорвано. Игра окончена. Ваш результат: ' + this.scoreBlock_text.get().innerHTML;
			this.get().appendChild(this.CRWindow.get());
		})

		this.mediator.subscribe(Events.MULTIPLAYER_GAME_FINISHED, (args) => {
			this.finishText.get().innerHTML = 'Игра окончена. </br> Ваш результат: ' + args.score;
			this.get().appendChild(this.finishWindow.get());
		})
		this.mediator.subscribe(Events.MULTIPLAYER_NEW_WAVE_STARTED, (args) => {
			this.waveBlock_text.get().innerHTML = args.wave;
		})
		this.mediator.subscribe(Events.MULTIPLAYER_GET_SCORE, (args) => {
			this.scoreBlock_text.get().innerHTML = args.score;
		})
		this.mediator.subscribe(Events.MULTIPLAYER_THRONE_DAMAGE, (args) => {
			this.HPBlock_text.get().innerHTML = args.health;
		})
		this.mediator.subscribe(Events.MULTIPLAYER_PLAY_AGAIN, () => {
			this.reset();
		})

		this.quitButton.on('click', () => {
			this.get().appendChild(this.quitConfirm.get());
		})

		this.quitCancelButton.on('click', () => {
			this.get().removeChild(this.quitConfirm.get());
		})

		this.quitConfirmButton.on('click', () => {
			this.get().removeChild(this.quitConfirm.get());
			this.mediator.emit(Events.MULTIPLAYER_QUIT_CONFIRMED, {
				score: parseInt((this.scoreBlock_text.get().innerHTML))
			});
			this.reset();
		})

		this.exitButton.on('click', () => {
			this.get().removeChild(this.finishWindow.get());
			this.mediator.emit(Events.MULTIPLAYER_EXIT_TO_MENU);
			this.reset();
		})

		this.againButton.on('click', () => {
			this.get().removeChild(this.finishWindow.get());
			this.mediator.emit(Events.MULTIPLAYER_PLAY_AGAIN);
			this.reset();
		})

		this.CRexitButton.on('click', () => {
			this.get().removeChild(this.CRWindow.get());
			this.mediator.emit(Events.MULTIPLAYER_EXIT_TO_MENU);
			this.reset();
		})

		this.CRagainButton.on('click', () => {
			this.get().removeChild(this.CRWindow.get());
			this.mediator.emit(Events.MULTIPLAYER_PLAY_AGAIN);
			this.reset();
		})
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
		this.userBlock.get().appendChild(this.userBlock_name1.get());
		this.userBlock.get().appendChild(this.userBlock_sep.get());
		this.userBlock.get().appendChild(this.userBlock_name2.get());
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

		this.CRWindow.get().appendChild(this.CRText.get());
		this.CRWindow.get().appendChild(this.CRButtons.get());
		this.CRButtons.get().appendChild(this.CRexitButton.get());
		this.CRButtons.get().appendChild(this.CRagainButton.get());
	}

	loginSwitch(user) {
		this.userBlock_name1.get().innerHTML = user;
	}

	unloginSwitch(user) {
		this.loginSwitch(user);
	}
}

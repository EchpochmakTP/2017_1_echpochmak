(function () {

	'use strict';

	class Menu extends BaseView {
		constructor() {
			super('div', {
				'class': 'menu'
			});
			this.padd = new BaseBlock('div', {
				'class': 'padd',
				'align': 'center'
			});
			this.line1 = new BaseBlock('div', {
				'class': 'line',
				'align': 'center'
			});
			this.line2 = new BaseBlock('div', {
				'class': 'line',
				'align': 'center'
			});
			this.singleButton = new MenuButton('Одиночная игра', {
				'id': 'ruby',
				'class': 'single-button'
			});
			this.multiButton = new MenuButton('Мультиплеер', {
				'id': 'saph',
				'class': 'multi-button'
			});
			this.aboutButton = new MenuButton('Об игре', {
				'id': 'izum',
				'class': 'about-button'
			});
			this.leaderButton = new MenuButton('Лидеры', {
				'id': 'bril',
				'class': 'leaderboard-button'
			});
			this.greeting = new Greeting('Гость');

			this.render();
			this.makeListeners();
		}

		render() {
			this.get().removeChild(this.back.get());
			
			this.get().appendChild(this.padd.get());
			this.padd.get().appendChild(this.line1.get());
			this.padd.get().appendChild(this.line2.get());
			this.line1.get().appendChild(this.singleButton.get());
			this.line1.get().appendChild(this.multiButton.get());
			this.line2.get().appendChild(this.aboutButton.get());
			this.line2.get().appendChild(this.leaderButton.get());
			this.get().appendChild(this.greeting.get());
		}

		makeListeners() {

			this.singleButton.on('click', () => {
				event.preventDefault();

				Main.pages.menu.hide();
				Main.pages.single.show();
			})

			this.multiButton.on('click', () => {
				event.preventDefault();

				Main.pages.menu.hide();
				Main.pages.multi.show();

			})

			this.aboutButton.on('click', () => {
				event.preventDefault();

				Main.pages.menu.hide();
				Main.pages.about.show();
			})

			this.leaderButton.on('click', () => {
				event.preventDefault();

				Main.pages.menu.hide();
				Main.pages.leader.show();
			})
		}
	}

	window.Menu = Menu;

})();
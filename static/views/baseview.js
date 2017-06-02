'use strict';

import BaseBlock from '../components/BaseBlock/baseblock.js'
import Back from '../components/Back/back.js'
import Router from '../modules/router.js'

export default
class BaseView extends BaseBlock {
	constructor(tag, attrs) {
		super(tag, attrs);
		this.back = new Back();

		this.back.onclick(() => {
			const router = new Router();
			event.preventDefault();
			router.go('/');
		})
		this.get().appendChild(this.back.get());

		this.green_background = '/img/back_green.jpg';
		this.white_background = '/img/back_yellow1.jpg';
		this.background = this.green_background;
	}

	show() {
		document.querySelector('body').appendChild(this.get());
		document.body.background = this.background;
	}

	hide() {
		document.querySelector('body').removeChild(this.get());
	}

	loginSwitch(name) {

	}

	unloginSwitch(name) {

	}
}

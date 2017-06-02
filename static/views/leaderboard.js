'use strict';

import BaseView from './baseview.js'
import BaseBlock from '../components/BaseBlock/baseblock.js'
import UserService from '../services/userservice.js'

export default
class LeaderBoard extends BaseView {
	constructor() {
		super('div', {
			class: 'leaderboard'
		});
		this.list = new BaseBlock('div', {
			class: 'list'
		});
		this.render();
	}

	render() {
		this.get().appendChild(this.list.get());

		this.template = window.fest['leaderboard.tmpl'];
		this.list.get().innerHTML = this.template({});
	}

	show() {
		super.show();
		this.update();
	}

	update() {
		const service = new UserService();
		service.getUsersList(xhr => {
			this.list.get().innerHTML = this.template(xhr);
			this.paint();
		});
	}

	paint() {
		let rows = this.list.get().querySelectorAll('.line.row');

		rows[1].style.borderTopLeftRadius = '15px';
		rows[1].style.borderTopRightRadius = '15px';
		rows[rows.length - 1].style.borderBottomLeftRadius = '15px';
		rows[rows.length - 1].style.borderBottomRightRadius = '15px';

		let mark = true;
		const color1 = 'rgb(229, 251, 195)';
		const color2 = 'rgb(203, 236, 153)';
		for (let i = 1; i < rows.length; i++) {
			if (!mark) {
				rows[i].style.backgroundColor = color1;
			} else {	
				rows[i].style.backgroundColor = color2;
			}
			mark = !mark;
		}
	}
}

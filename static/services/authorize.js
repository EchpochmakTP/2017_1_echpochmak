'use strict';

import UserService from './userservice.js'
import Router from '../modules/router.js'

export default
class Authorize {
	constructor() {
		if (Authorize.__instance) {
			return Authorize.__instance;
		}

		this.service = new UserService();
		this.router = new Router();

		this.user = {};
		this.anonymUser = {
			username: 'Гость',
			score: 0
		}
		Object.assign(this.user, this.anonymUser);

		Authorize.__instance = this;
	}

	init() {
		this.showForGuest();

		this.service.getUsername(xhr => {
			if (xhr.status === 'ok') {
				this.user.username = xhr.login;
				this.loadUserScore();
				this.showForUser();
			} else {
				this.showForGuest();
			}
		});
	}

	loadUserScore() {
		this.service.getUserScore(xhr => {
			if (xhr.status === 'ok') {
				this.user.score = xhr.score;
			}
		})
	}

	authorize() {
		this.service.getUsername(xhr => {
			if (xhr.status === 'ok') {
				this.user.username = xhr.login;
				this.loadUserScore();
				this.showForUser();
			}
		});
	}

	deauthorize() {
		this.service.logout(xhr => {
			Object.assign(this.user, this.anonymUser);
			this.showForGuest();
		});
	}

	showForUser() {
		this.router.loginSwitch(this.user);
	}

	showForGuest() {
		this.router.unloginSwitch(this.anonymUser);
	}
}

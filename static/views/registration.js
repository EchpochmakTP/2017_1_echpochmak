'use strict';

import BaseView from './baseview.js'
import BaseBlock from '../components/BaseBlock/baseblock.js'
import RegisterForm from '../components/RegisterForm/registerform.js'
import Router from '../modules/router.js'
import UserService from '../services/userservice.js'
import Authorize from '../services/authorize.js'

export default
class Register extends BaseView {
	constructor() {
		super('div', {
			class: 'registration'
		});
		this.background = this.white_background;
		
		this.padd = new BaseBlock('div', {
			class: 'padd'
		});
		this.form = new RegisterForm();
		this.form.on('submit', () => {

			event.preventDefault();

			const router = new Router();
			const service = new UserService();
			const auth = new Authorize();

			if (this.form.validate()) {

				service.register(this.form.data.email, this.form.data.login, this.form.data.password, xhr => {
					if (xhr.status === 'ok') {
						router.go('/');

						auth.authorize();

						this.form.get().reset();
						this.form.message.clean();
					} else {
						this.form.message.showMessage('Такой логин или E-Mail уже заняты');
					}
				});
			}
		})

		this.render();
	}

	render() {
		this.get().appendChild(this.padd.get());
		this.padd.get().appendChild(this.form.get());
	}
}

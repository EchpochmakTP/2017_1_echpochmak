(function () {

	'use strict';

	class Login extends BaseView {
		constructor() {
			super('div', {
				'class': 'login'
			});
			this.padd = new BaseBlock('div', {
				'class': 'padd'
			});
			this.form = new LoginForm();

			this.render();
		}

		render() {
			this.get().appendChild(this.padd.get());
			this.padd.get().appendChild(this.form.get());
		}
	}

	window.Login = Login;

})();
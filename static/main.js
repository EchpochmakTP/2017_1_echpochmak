'use strict';

import Menu from './views/menu.js'
import Login from './views/login.js'
import Register from './views/registration.js'
import About from './views/about.js'
import LeaderBoard from './views/leaderboard.js'
import SinglePlayer from './views/singleplayer/singleplayer.js'
import MultiPlayer from './views/multiplayer/multiplayer.js'
import Authorize from './services/authorize.js'
import HTTP from './modules/http.js'
import Router from './modules/router.js'

import './css/styles.scss'

const http = new HTTP();
const router = new Router();

http.BaseURL = 'https://gem-td-back.herokuapp.com';

router.register('/', new Menu());
router.register('/login/', new Login());
router.register('/register/', new Register());
router.register('/about/', new About());
router.register('/leaders/', new LeaderBoard());
router.register('/game/', new SinglePlayer());
router.register('/multiplayer/', new MultiPlayer());

router.start();

const auth = new Authorize();
auth.init();
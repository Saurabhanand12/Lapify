import express from 'express';
import { addhistory, clearHistory, deletehistory, gethistory } from '../Controllers/histroy.controller.js';
import isloggedin from '../Middleware/isLoggedin.js';

const router = express.Router();

router.route('/add').post(isloggedin,addhistory);

router.route('/get').get(isloggedin,gethistory);

router.route('/delete/:id').delete(isloggedin,deletehistory);

router.route('/clear').delete(isloggedin,clearHistory);

export default router;
import express from 'express';
import { addtowishlist, getwishlist, removewishlist } from '../Controllers/wishlist.controller.js';
import isloggedin from '../Middleware/isLoggedin.js'

const router = express.Router();

router.route('/add').post(isloggedin,addtowishlist);
router.route('/get').get(isloggedin,getwishlist);
router.route('/remove/:id').delete(isloggedin,removewishlist);

export default router;
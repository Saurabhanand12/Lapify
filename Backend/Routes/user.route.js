import express from 'express';
import { changepassword, edit, getprofile, login, logout, register } from '../Controllers/user.controller.js';
import isloggedin from '../Middleware/isLoggedin.js';
import upload from '../Middleware/multer.js'


const router = express.Router();

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/logout').get(logout);
router.route('/profile/edit').put(isloggedin,upload.single('profilepic'),edit);
router.route('/:id/profile').get(isloggedin,getprofile);
// router.route('/forgetpassword').post(forgetpassword);
// router.route('/resetpassword/:token').post(resetpassword);
router.route('/changepassword').post(isloggedin,changepassword);


export default router;
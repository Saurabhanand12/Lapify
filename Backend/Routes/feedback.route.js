import express from 'express';
import { addfeedback, deletefeedback, getfeedback } from '../Controllers/feedback.controller.js';

const router = express.Router();

router.route('/add').post(addfeedback);
router.route('/:id').get(getfeedback);
router.route('/delete/:id').delete(deletefeedback);

export default router;
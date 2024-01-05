import express from 'express';
import * as bookController from '../controllers/bookController';

const router = express.Router();

router.post('/', bookController.createBook);
router.get('/', bookController.getAllBooks);

export default router;

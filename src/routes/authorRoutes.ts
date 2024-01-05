import express from 'express';
import * as authorController from '../controllers/authorController';

const router = express.Router();

router.post('/', authorController.createAuthor);
router.get('/', authorController.getAllAuthors);

export default router;

import express, { Request, Response } from 'express';

const router = express.Router();

/* GET home page. testing */
router.get('/', (_req: Request, res: Response): void => {
  res.render('index', { title: 'Express' });
});

/* GET home page. testing */
router.get('/:id', (_req: Request, res: Response): void => {
  res.render('index', { title: 'Express' });
});

export default router;

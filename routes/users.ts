import express, { Request, Response } from 'express';

const router = express.Router();

/* GET users listing. */
router.get('/', (_req: Request, res: Response): void => {
  res.send('respond with a resource');
});

export default router;

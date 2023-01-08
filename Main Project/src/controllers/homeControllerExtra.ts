import { Request, Response } from 'express';

export const postHomeExtra = async (req: Request, res: Response) => {
  return res.render('extra');
};

import { NextFunction, Request, Response } from 'express';

export const expressAdapter = function(moduleFn: any) {
  return async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      const controller = moduleFn();
      const response = await controller.handle(req.query, req.body);

      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({
        mensagem: (error as any).message || 'Erro inesperado.',
      });
    }
  };
};

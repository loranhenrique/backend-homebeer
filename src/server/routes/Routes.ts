import { expressAdapter } from '@adapter';
import { criarUsuarioModule } from '@server';
import { Router } from 'express';

const router = Router();

router.post('/user', expressAdapter(criarUsuarioModule));

export { router };

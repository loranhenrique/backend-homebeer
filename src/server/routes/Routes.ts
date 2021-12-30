import { expressAdapter } from '@adapter';
import { autenticarUsuarioModule, criarUsuarioModule } from '@server';
import { Router } from 'express';

const router = Router();

router.post('/registrar', expressAdapter(criarUsuarioModule));
router.post('/autenticar', expressAdapter(autenticarUsuarioModule));

export { router };

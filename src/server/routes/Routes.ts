import { expressAdapter } from '@adapter';
import { autenticarUsuarioModule, buscarUsuarioModule, criarUsuarioModule } from '@server';
import { Router } from 'express';

const router = Router();

router.post('/user', expressAdapter(criarUsuarioModule));
router.get('/user', expressAdapter(buscarUsuarioModule));
router.post('/autenticar', expressAdapter(autenticarUsuarioModule));

export { router };

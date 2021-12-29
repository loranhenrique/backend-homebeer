import { expressAdapter } from '@adapter';
import { criarUsuarioModule } from '@server';
import { Router } from 'express';
import { buscarUsuarioModule } from '../modules/BuscarUsuarioModule';

const router = Router();

router.post('/user', expressAdapter(criarUsuarioModule));
router.get('/user', expressAdapter(buscarUsuarioModule));

export { router };

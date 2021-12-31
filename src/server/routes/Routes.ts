import { expressAdapter } from '@adapter';
import { autenticarUsuarioModule, buscarParceiroModule, criarParceiroModule, criarUsuarioModule } from '@server';
import { Router } from 'express';

const router = Router();

router.post('/usuario/registrar', expressAdapter(criarUsuarioModule));
router.post('/usuario/autenticar', expressAdapter(autenticarUsuarioModule));
router.post('/parceiro', expressAdapter(criarParceiroModule));
router.get('/parceiro', expressAdapter(buscarParceiroModule));

export { router };

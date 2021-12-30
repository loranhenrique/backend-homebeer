import { expressAdapter } from '@adapter';
import { autenticarUsuarioModule, criarParceiroModule, criarUsuarioModule } from '@server';
import { Router } from 'express';

const router = Router();

router.post('/usuario/registrar', expressAdapter(criarUsuarioModule));
router.post('/usuario/autenticar', expressAdapter(autenticarUsuarioModule));
router.post('/parceiro/registrar', expressAdapter(criarParceiroModule));

export { router };

import { expressAdapter } from '@adapter';
import {
  autenticarUsuarioModule,
  buscarCarrinhoModule,
  buscarParceiroModule,
  buscarProdutoModule,
  criarParceiroModule,
  criarProdutoModule,
  criarUsuarioModule,
  salvarCarrinhoModule,
} from '@server';
import { Router } from 'express';
import { salvarFavoritoModule } from '../modules';

const router = Router();

router.post('/usuario/registrar', expressAdapter(criarUsuarioModule));
router.post('/usuario/autenticar', expressAdapter(autenticarUsuarioModule));
router.post('/parceiro', expressAdapter(criarParceiroModule));
router.get('/parceiro', expressAdapter(buscarParceiroModule));
router.post('/produto', expressAdapter(criarProdutoModule));
router.get('/produto', expressAdapter(buscarProdutoModule));
router.post('/carrinho', expressAdapter(salvarCarrinhoModule));
router.get('/carrinho', expressAdapter(buscarCarrinhoModule));
router.post('/favorito', expressAdapter(salvarFavoritoModule));

export { router };

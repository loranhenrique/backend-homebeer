import { expressAdapter } from '@adapter';
import {
  autenticarUsuarioModule,
  buscarCarrinhoModule,
  buscarFavoritoModule,
  buscarParceiroModule,
  buscarPedidoModule,
  buscarProdutoModule,
  criarParceiroModule,
  criarProdutoModule,
  criarUsuarioModule,
  salvarCarrinhoModule,
  salvarFavoritoModule,
  salvarPedidoModule,
  deletarCarrinhoModule,
} from '@server';
import { Router } from 'express';

const router = Router();

router.post('/api/usuario/registrar', expressAdapter(criarUsuarioModule));
router.post('/api/usuario/autenticar', expressAdapter(autenticarUsuarioModule));
router.post('/api/parceiro', expressAdapter(criarParceiroModule));
router.get('/api/parceiro', expressAdapter(buscarParceiroModule));
router.post('/api/produto', expressAdapter(criarProdutoModule));
router.get('/api/produto', expressAdapter(buscarProdutoModule));
router.post('/api/carrinho', expressAdapter(salvarCarrinhoModule));
router.get('/api/carrinho', expressAdapter(buscarCarrinhoModule));
router.delete('/api/carrinho', expressAdapter(deletarCarrinhoModule));
router.post('/api/favorito', expressAdapter(salvarFavoritoModule));
router.get('/api/favorito', expressAdapter(buscarFavoritoModule));
router.post('/api/pedido', expressAdapter(salvarPedidoModule));
router.get('/api/pedido', expressAdapter(buscarPedidoModule));

export { router };

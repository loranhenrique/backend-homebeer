import { FavoritoEntity, IFavoritoBoundary, ParceiroEntity } from '@core';
import { FavoritoModel, IFavorito } from '@database';

export class MongoFavoritoRepository implements IFavoritoBoundary {
  public async deletarFavorito(idUsuario: string, idParceiro: string): Promise<void> {
    await FavoritoModel.findOneAndDelete({
      usuario: idUsuario,
      parceiro: idParceiro,
    });
  }

  public async buscarFavorito(idUsuario: string): Promise<FavoritoEntity> {
    const Favorito: IFavorito[] = await FavoritoModel.find({ usuario: idUsuario })
      .populate('usuario')
      .populate('parceiro');

    if (Favorito.length < 1) return { idUsuario, favoritos: [] };

    return {
      idUsuario: idUsuario,
      favoritos: this.criarFavoritos(Favorito),
    };
  }

  public async salvarFavorito(idUsuario: string, idParceiro: string): Promise<void> {
    await FavoritoModel.create({ usuario: idUsuario, parceiro: idParceiro });
  }

  private criarFavoritos(favoritos: IFavorito[]): ParceiroEntity[] {
    return favoritos.map((itemFavorito: IFavorito) => ({
      id: itemFavorito.parceiro._id,
      ativo: itemFavorito.parceiro.ativo,
      nomeCompletoDono: itemFavorito.parceiro.nomeCompletoDono,
      email: itemFavorito.parceiro.email,
      senha: itemFavorito.parceiro.senha,
      celularDono: itemFavorito.parceiro.celularDono,
      imagemLoja: itemFavorito.parceiro.imagemLoja,
      nomeLoja: itemFavorito.parceiro.nomeLoja,
      descricaoLoja: itemFavorito.parceiro.descricaoLoja,
      cnpj: itemFavorito.parceiro.cnpj,
      categoria: itemFavorito.parceiro.categoria,
    }));
  }
}

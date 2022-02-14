import { FavoritoEntity, IFavoritoBoundary, IUsuarioBoundary, UsuarioEntity } from '@core';
import { ParceiroEntity } from '../entities';

export default class BuscarFavoritoUseCase {
  public constructor(private iFavoritoBoundary: IFavoritoBoundary, private iUsuarioBoundary: IUsuarioBoundary) {}

  public async execute(idUsuario: string): Promise<FavoritoEntity> {
    const usuario: UsuarioEntity = await this.iUsuarioBoundary.buscarUsuario(null, idUsuario);
    const existeErro = await this.validarUsuario(usuario);
    if (existeErro) throw new Error(existeErro);

    const favorito: FavoritoEntity = await this.iFavoritoBoundary.buscarFavorito(idUsuario);
    const favoritoAtivo: FavoritoEntity = this.retirarParceirosInativos(favorito);
    return favoritoAtivo;
  }

  private async validarUsuario(usuario: UsuarioEntity): Promise<string> {
    if (!usuario) return 'Usuario não foi encontrado.';
    if (!usuario.ativo) return 'Usuario está inativo.';
    return '';
  }

  private retirarParceirosInativos(favorito: FavoritoEntity): FavoritoEntity {
    const favoritosAtivos: ParceiroEntity[] = [];

    favorito.favoritos.forEach((item: ParceiroEntity) => {
      item.ativo ? favoritosAtivos.push(item) : this.iFavoritoBoundary.deletarFavorito(favorito.idUsuario, item.id);
    });

    return FavoritoEntity.buscarFavorito({ idUsuario: favorito.idUsuario, favoritos: favoritosAtivos });
  }
}

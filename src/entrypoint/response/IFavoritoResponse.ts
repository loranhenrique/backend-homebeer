export interface IFavoritoResponse {
  idUsuario: string;
  favoritos: Array<{
    idParceiro: string;
    imagemParceiro: string;
    nomeParceiro: string;
    descricaoParceiro: string;
  }>;
}

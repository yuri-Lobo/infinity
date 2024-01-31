export class CustomButton {
  public icone: string;
  public cssClass: string;
  public title: string;
  public nome: string;
  public showOnPermission: boolean;

  constructor(icone: string, cssClass: string, title: string, nome: string,permissao:boolean=false) {
    this.icone = icone;
    this.cssClass = cssClass;
    this.title = title;
    this.nome = nome;
    this.showOnPermission = permissao;
  }
}

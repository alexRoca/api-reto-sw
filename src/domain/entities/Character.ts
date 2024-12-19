export class Character {
  id: string;
  nombre: string;
  altura?: string;
  peso?: string;
  genero?: string;

  constructor(id: string, nombre: string, altura?: string, peso?: string, genero?: string) {
    this.id = id;
    this.nombre = nombre;
    this.altura = altura;
    this.peso = peso;
    this.genero = genero;
  }
}

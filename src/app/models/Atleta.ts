import { Equipe } from "./equipe";
import { Categoria } from "./categoria";
import { Prova } from "./prova";

export class Atleta {

    id: number;
    nome: string;
    numero: number;
    sexo: number;
    equipe: Equipe;
    categoria: Categoria;
    prova: Prova;

    constructor() { 
        this.equipe = new Equipe();
        this.categoria = new Categoria();
        this.prova = new Prova();
    }

}

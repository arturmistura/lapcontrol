import { Atleta } from "./atleta";

export class Tempo {

    id: number;
    marcacao: Date;
    atleta: Atleta;

    constructor() { 
        this.atleta = new Atleta();
    }

}

export class ResponseTesteDTO {
    id: string;
    descricao: string;
    tipo: string;
  
    constructor(id: string, descricao: string, tipo: string) {
      this.id = id;
      this.descricao = descricao;
      this.tipo = tipo;
    }
  
    toJson() {
      return {
        id: this.id,
        descricao: this.descricao,
        tipo: this.tipo,
      };
    }
  }
  
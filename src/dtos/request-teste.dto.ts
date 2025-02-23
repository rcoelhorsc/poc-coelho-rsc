export class RequestTesteDTO {
    descricao: string;
    tipo: string;
  
    constructor(descricao: string, tipo: string) {
      RequestTesteDTO.validate({ descricao, tipo }); // Chama o método validate antes de criar o objeto
      this.descricao = descricao;
      this.tipo = tipo;
    }
  
    static validate(json: { descricao: string; tipo: string }) {
      if (!json.descricao || typeof json.descricao !== 'string' || json.descricao.trim().length < 3) {
        throw new Error("O campo 'descricao' deve ser uma string com pelo menos 3 caracteres.");
      }
  
      const tiposValidos = ['dev', 'qa', 'prod'];
      if (!json.tipo || typeof json.tipo !== 'string' || !tiposValidos.includes(json.tipo)) {
        throw new Error(`O campo 'tipo' deve ser uma string válida: ${tiposValidos.join(', ')}`);
      }
    }
  
    static fromJson(json: { descricao: string; tipo: string }): RequestTesteDTO {
      RequestTesteDTO.validate(json);
      return new RequestTesteDTO(json.descricao, json.tipo);
    }
  }
  
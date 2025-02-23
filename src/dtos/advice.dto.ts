export class AdviceDTO {
    advice: string;
    timestamp: string;
  
    constructor(advice: string) {
      this.advice = advice;
      this.timestamp = new Date().toISOString();
    }
  }
  
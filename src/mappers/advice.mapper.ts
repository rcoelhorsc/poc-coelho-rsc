import { AdviceDTO } from '../dtos/advice.dto';

export const mapToAdviceDto = (adviceResponse: any): AdviceDTO => {
  return new AdviceDTO(adviceResponse.slip.advice);
};

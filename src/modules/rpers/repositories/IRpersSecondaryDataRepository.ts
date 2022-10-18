import { ICreateRperSecondaryDataDTO } from '../dtos/ICreateRperSecondaryDataDTO';
import { RperSecondaryData } from '../infra/typeorm/entities/RperSecondaryData';

export interface IRpersSecondaryDataRepository {
  create(data: ICreateRperSecondaryDataDTO): Promise<RperSecondaryData>;
}

import { inject, injectable } from 'tsyringe';

import { ICreateRperSecondaryDataDTO } from '../dtos/ICreateRperSecondaryDataDTO';
import { IRpersSecondaryDataRepository } from '../repositories/IRpersSecondaryDataRepository';

@injectable()
export class UpdateRperSecondaryDataService {
  constructor(
    @inject('RpersSecondaryDataRepository')
    private rpersSecondaryDataRepository: IRpersSecondaryDataRepository,
  ) {}

  async execute(data: ICreateRperSecondaryDataDTO): Promise<void> {
    const rper = await this.rpersSecondaryDataRepository.findByRperId(
      data.rper_id,
    );

    Object.assign(rper, data);

    await this.rpersSecondaryDataRepository.update(rper);
  }
}

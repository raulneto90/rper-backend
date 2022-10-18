import { getRepository, Repository } from 'typeorm';

import ICreateRperDTO from '@modules/rpers/dtos/ICreateRperDTO';
import IRpersRepository from '@modules/rpers/repositories/IRpersRepository';

import Rper from '../entities/Rper';

class RpersRepository implements IRpersRepository {
  private ormRepository: Repository<Rper>;

  constructor() {
    this.ormRepository = getRepository(Rper);
  }

  public async findRperByName(name: string): Promise<Rper | undefined> {
    const findRperByName = await this.ormRepository.findOne({
      where: { name },
    });

    return findRperByName;
  }

  public async create({ name, coordinator_id }: ICreateRperDTO): Promise<Rper> {
    const rper = this.ormRepository.create({ name, coordinator_id });
    await this.ormRepository.save(rper);
    return rper;
  }

  public async findAllRpers(): Promise<Rper[]> {
    const rpers = await this.ormRepository.find();
    return rpers;
  }

  async findById(id: string): Promise<Rper | undefined> {
    return this.ormRepository.findOne(id);
  }

  async update(rper: Rper): Promise<void> {
    await this.ormRepository.save(rper);
  }
}

export default RpersRepository;

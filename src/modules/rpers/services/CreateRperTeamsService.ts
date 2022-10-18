import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

import { ICreateRperTeamsDTO } from '../dtos/ICreateRperTeamsDTO';
import IRpersRepository from '../repositories/IRpersRepository';

@injectable()
export class CreateRperTeamsService {
  constructor(
    @inject('RpersRepository')
    private rpersRepository: IRpersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: ICreateRperTeamsDTO): Promise<void> {
    const rper = await this.rpersRepository.findById(data.rper_id);

    if (!rper) {
      throw new AppError('RPER not found', 404);
    }

    const users = await this.usersRepository.findByIds(data.users_ids);

    if (users.length === 0) {
      throw new AppError('Users informed not found', 404);
    }

    rper.teams = users;

    await this.rpersRepository.update(rper);
  }
}

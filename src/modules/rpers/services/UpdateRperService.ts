import { inject, injectable } from 'tsyringe';

import IRpersRepository from '../repositories/IRpersRepository';

@injectable()
export class UpdateRperService {
  constructor(
    @inject('RpersRepository')
    private rpersRepository: IRpersRepository,
  ) {}

  async execute(): Promise<void> {}
}

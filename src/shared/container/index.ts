import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import RpersRepository from '@modules/rpers/infra/typeorm/repositories/RpersRepository';
import { RpersSecondaryDataRepository } from '@modules/rpers/infra/typeorm/repositories/RpersSecondaryDataRepository';
import IRpersRepository from '@modules/rpers/repositories/IRpersRepository';
import { IRpersSecondaryDataRepository } from '@modules/rpers/repositories/IRpersSecondaryDataRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

container.registerSingleton<IRpersRepository>(
  'RpersRepository',
  RpersRepository,
);
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);
container.registerSingleton<IRpersSecondaryDataRepository>(
  'RpersSecondaryDataRepository',
  RpersSecondaryDataRepository,
);

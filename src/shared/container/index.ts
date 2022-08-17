import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IRpersRepository from '@modules/rpers/repositories/IRpersRepository';
import RpersRepository from '@modules/rpers/infra/typeorm/repositories/RpersRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

container.registerSingleton<IRpersRepository>('RpersRepository', RpersRepository,);
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository,);
container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository,);
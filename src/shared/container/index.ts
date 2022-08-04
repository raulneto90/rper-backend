import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IRpersRepository from '@modules/rpers/repositories/IRpersRepository';
import RpersRepository from '@modules/rpers/infra/typeorm/repositories/RpersRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IRpersRepository>('RpersRepository', RpersRepository,);
container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository,);
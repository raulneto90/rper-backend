import { NextFunction, Request, Response } from 'express';

import AppError from '@shared/errors/AppError';

import RpersRepository from '../../typeorm/repositories/RpersRepository';

export async function ensureRperMember(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const user_id = request.user.id;
  const { rper_id } = request.params;

  const rpersRepository = new RpersRepository();

  const rper = await rpersRepository.findById(rper_id);

  if (!rper) {
    throw new AppError('RPER not found', 404);
  }

  if (
    rper.coordinator_id !== user_id ||
    !!rper.teams?.find(rper => rper.user_id === user_id)
  ) {
    throw new AppError('User does not have permission to alter rper', 403);
  }

  return next();
}

// ensureAuthenticated -> ensurePermission -> handle

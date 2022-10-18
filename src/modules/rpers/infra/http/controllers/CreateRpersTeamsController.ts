import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ICreateRperTeamsDTO } from '@modules/rpers/dtos/ICreateRperTeamsDTO';
import { CreateRperTeamsService } from '@modules/rpers/services/CreateRperTeamsService';

export class CreateRpersTeamsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data: ICreateRperTeamsDTO = request.body;

    const createRperTeamsService = container.resolve(CreateRperTeamsService);

    await createRperTeamsService.execute(data);

    return response.status(201).json();
  }
}

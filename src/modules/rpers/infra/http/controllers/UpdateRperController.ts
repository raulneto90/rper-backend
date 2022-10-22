import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateRperService } from '@modules/rpers/services/UpdateRperService';

export class UpdateRperController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateRperService = container.resolve(UpdateRperService);

    await updateRperService.execute();

    return response.status(204).json();
  }
}

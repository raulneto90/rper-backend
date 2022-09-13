import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateRperService from '@modules/rpers/services/CreateRperService';
import ListRpersService from '@modules/rpers/services/ListRpersService';

export default class RpersController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { name, coordinator_id } = request.body;

        const createRper = container.resolve(CreateRperService);
        const rper = await createRper.execute({ name, coordinator_id });

        return response.json(rper);
    }

    public async index(request: Request, response: Response): Promise<Response> {
        const listRpers = container.resolve(ListRpersService);
        const rpers = await listRpers.execute();

        return response.json(rpers);
    }
}
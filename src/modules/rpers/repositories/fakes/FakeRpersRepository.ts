import { uuid } from 'uuidv4';

import IRpersRepository from '@modules/rpers/repositories/IRpersRepository'
import ICreateRperDTO from '@modules/rpers/dtos/ICreateRperDTO';

import Rper from '../../infra/typeorm/entities/Rper';

class RpersRepository implements IRpersRepository {
    private rpers: Rper[] = [];

    public async findRperByName(name: string): Promise<Rper | undefined> {
        const findRperByName = this.rpers.find(
            rper => rper.name === name,
        );

        return findRperByName;
    }

    public async create({ name, coordinator_id }: ICreateRperDTO): Promise<Rper> {
        const rper = new Rper();

        // rper.rper_id = uuid();
        // rper.name = name;
        // rper.coordinator_id = coordinator_id;
        //Relaced by Object.assign: 
        Object.assign(rper, { id: uuid(), name, coordinator_id });

        this.rpers.push(rper);
        return rper;
    }

}

export default RpersRepository;
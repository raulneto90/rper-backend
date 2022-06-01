import Rper from '../models/Rper';
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Rper)
class RpersRepository extends Repository<Rper>{
    public async findRperByName(name: string): Promise<Rper | null> {
        const findRperByName = await this.findOne({
            where: { name },
        });

        return findRperByName || null;
    }

}

export default RpersRepository;
import ICreateRperDTO from '../dtos/ICreateRperDTO';
import Rper from '../infra/typeorm/entities/Rper';

export default interface IRpersRepository {
  create(data: ICreateRperDTO): Promise<Rper>;
  findRperByName(name: string): Promise<Rper | undefined>;
  findAllRpers(): Promise<Rper[]>;
  findById(id: string): Promise<Rper>;
  update(rper: Rper): Promise<void>;
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

import { RperSecondaryData } from './RperSecondaryData';

@Entity('rpers')
class Rper {
  @PrimaryGeneratedColumn('uuid')
  rper_id: string;

  @Column()
  name: string;

  @Column()
  coordinator_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'coordinator_id' })
  coordinator: User;

  @OneToOne(() => RperSecondaryData, secondaryData => secondaryData.rper)
  @JoinColumn({ name: 'rper_id' })
  secondaryData: RperSecondaryData;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Rper;

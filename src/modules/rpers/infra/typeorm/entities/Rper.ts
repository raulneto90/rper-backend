import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
  ManyToMany,
  JoinTable,
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

  @ManyToMany(() => User)
  @JoinTable({
    name: 'rper_teams',
    joinColumns: [{ name: 'rper_id' }],
    inverseJoinColumns: [{ name: 'user_id' }],
  })
  teams: User[];

  @OneToOne(() => RperSecondaryData, secondaryData => secondaryData.rper)
  @JoinColumn({ name: 'rper_id' })
  secondaryData: RperSecondaryData;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Rper;

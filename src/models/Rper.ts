import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import User from "./User";

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

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Rper;
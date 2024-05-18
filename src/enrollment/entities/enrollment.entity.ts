import { Counter } from 'src/counter/entities/counter.entity';
import { Section } from 'src/section/entities/section.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Enrollment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    grade: number;

    @Column()
    year: number;

    @Column()
    startDate: Date;

    @Column()
    finishDate: Date;

    @OneToMany(() => Section, section => section.enrollment, {eager: true})
    sections: Section[];

    @OneToMany(() => Counter, counter => counter.enrollment, {eager: true})
    counters: Counter[];
}

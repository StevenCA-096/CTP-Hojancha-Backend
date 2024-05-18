import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Enrollment } from 'src/enrollment/entities/enrollment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, ManyToOne  } from 'typeorm';

@Entity()
export class Counter {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    startDate: Date;

    @Column()
    finishDate: Date;

    @ManyToOne(() => Enrollment, enrollment => enrollment.counters)
    enrollment: Enrollment;

    @OneToMany(() => Appointment, appointment => appointment.counter, {eager: true})
    appointments: Appointment[];
}

import { Counter } from 'src/counter/entities/counter.entity';
import { StudentEnrollment } from 'src/student_enrollment/entities/student_enrollment.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, ManyToOne  } from 'typeorm';

@Entity()
export class Appointment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    taken: boolean;

    @ManyToOne(() => Counter, counter => counter.appointments)
    counter: Counter;
    
    @OneToOne(() => StudentEnrollment, studentEnrollment => studentEnrollment.appointment)
    studentEnrollment: StudentEnrollment;
}

import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Section } from 'src/section/entities/section.entity';
import { Student } from 'src/student/entities/student.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn  } from 'typeorm';

@Entity()
export class StudentEnrollment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isRecursing: boolean;

    @OneToOne(() => Student, {eager: true})
    @JoinColumn()
    student: Student;

    @OneToOne(() => Section, {eager: true})
    @JoinColumn()
    section: Section;

    @OneToOne(() => Appointment, {eager: true})
    @JoinColumn()
    appointment: Appointment;
}
		
	


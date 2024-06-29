import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Section } from 'src/section/entities/section.entity';
import { Student } from 'src/student/entities/student.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne  } from 'typeorm';

@Entity()
export class StudentEnrollment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    isRecursing: boolean;

    @OneToOne(() => Student, {eager: true})
    @JoinColumn()
    student: Student;

    @ManyToOne(() => Section, (section) => section.enrollment,{eager: true})
    section: Section;

    @OneToOne(() => Appointment, {eager: true})
    @JoinColumn()
    appointment: Appointment;
}
		
	


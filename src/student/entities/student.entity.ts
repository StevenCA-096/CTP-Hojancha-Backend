import { Responsible } from 'src/responsible/entities/responsible.entity';
import { StudentEnrollment } from 'src/student_enrollment/entities/student_enrollment.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Student {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cedula: number;

    @Column()
    name: string;

    @Column()
    lastName1: string;

    @Column()
    lastName2: string;

    @Column()
    sex: string;

    @Column()
    country: string;

    @Column()
    birthplace: string;

    @Column()
    birthday: Date;

    @Column()
    lastInstitution: string;

    @Column()
    adequacy: string;

    @Column()
    canton: string;

    @Column()
    district: string;

    @Column()
    address: string;

    @Column()
    requireTransport: boolean;

    @Column({ nullable: true })
    transportRoute: string;

    @Column()
    personalEmail: string;

    @Column({ nullable: true })
    mepEmail: string;

    @OneToMany(() => Responsible, responsible => responsible.student, { eager: true })
    responsibles: Responsible[];

    @OneToOne(() => StudentEnrollment, studentEnrollment => studentEnrollment.student)
    studentEnrollment: StudentEnrollment;
}


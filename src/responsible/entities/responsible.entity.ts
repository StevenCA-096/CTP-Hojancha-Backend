import { Student } from 'src/student/entities/student.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Responsible {

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

    @Column({ nullable: true })
    homePhone: number;

    @Column({ nullable: true })
    mobilePhone: number;

    @Column()
    occupation: string;

    @Column()
    country: string;

    @ManyToOne(() => Student, student => student.responsibles)
    student: Student;
}


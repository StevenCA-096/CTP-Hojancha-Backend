import { Enrollment } from 'src/enrollment/entities/enrollment.entity';
import { SectionArea } from 'src/section_area/entities/section_area.entity';
import { StudentEnrollment } from 'src/student_enrollment/entities/student_enrollment.entity';
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne, JoinTable } from 'typeorm';

@Entity()
export class Section {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    quota: number;

    @Column()
    isAided: boolean;

    @Column()
    isNocturnal: boolean;

    @ManyToOne(() => Enrollment, enrollment => enrollment.sections)
    enrollment: Enrollment;

    @OneToMany(() => StudentEnrollment, studentEnrollment => studentEnrollment.section)
    studentEnrollment: StudentEnrollment;

    @JoinTable()
    @OneToMany(() => SectionArea, sectionarea => sectionarea.section, { eager: true })
    sectionareas: SectionArea[];
}

import { SectionArea } from 'src/section_area/entities/section_area.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Area {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    category: string;

    @OneToMany(() => SectionArea, sectionarea => sectionarea.area, { eager: true })
    sectionareas: SectionArea[];
}

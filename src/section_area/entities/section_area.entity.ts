import { Area } from "src/area/entities/area.entity";
import { Section } from "src/section/entities/section.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SectionArea {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Section, (section) => section.sectionareas)
    section: Section;

    @ManyToOne(() => Area, (area) => area.sectionareas)
    area: Area;

}

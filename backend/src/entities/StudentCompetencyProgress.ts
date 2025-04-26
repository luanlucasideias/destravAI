import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { User } from "./User";
import { CompetencyMetadata } from "./CompetencyMetadata";

@Entity()
export class StudentCompetencyProgress {
    @PrimaryColumn()
    student_id!: string;

    @PrimaryColumn()
    competency_id!: number;

    @Column()
    mastery_level!: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    last_updated!: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: "student_id" })
    student!: User;

    @ManyToOne(() => CompetencyMetadata)
    @JoinColumn({ name: "competency_id" })
    competency!: CompetencyMetadata;
} 
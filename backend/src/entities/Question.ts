import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { CompetencyMetadata } from "./CompetencyMetadata";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    competency_id!: number;

    @ManyToOne(() => CompetencyMetadata)
    @JoinColumn({ name: "competency_id" })
    competency!: CompetencyMetadata;

    @Column("text")
    text!: string;

    @Column("text", { array: true })
    options!: string[];

    @Column()
    correct_answer!: string;

    @Column()
    difficulty!: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updated_at!: Date;
} 
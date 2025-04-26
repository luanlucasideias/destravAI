import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Question } from "./Question";

@Entity()
export class StudentQuestionSession {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    student_id!: string;

    @Column()
    competency_id!: number;

    @Column("int", { array: true })
    question_ids!: number[];

    @Column("text", { array: true, nullable: true })
    answers_given!: string[];

    @Column()
    current_question_index!: number;

    @Column()
    total_questions_required!: number;

    @Column({ default: false })
    session_completed!: boolean;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    created_at!: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    last_interaction_at!: Date;

    @Column("jsonb", { nullable: true })
    competency_cooldown!: {
        competency_id: number;
        cooldown_until: Date;
    };

    @Column({ type: "int", nullable: true })
    last_competency_id?: number;

    // Campos calculados (não são armazenados no banco)
    questions?: Question[]; // Será preenchido ao carregar a sessão
} 
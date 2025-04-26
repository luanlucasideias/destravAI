import { Entity, PrimaryColumn, Column, CreateDateColumn } from "typeorm";

@Entity("competency_metadata")
export class CompetencyMetadata {
  @PrimaryColumn()
  id!: number;

  @Column()
  subject_code!: string;

  @Column()
  topic_code!: string;

  @Column()
  competency_code!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: true })
  level!: string;

  @CreateDateColumn()
  created_at!: Date;
} 
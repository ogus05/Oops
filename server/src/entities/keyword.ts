import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Topic } from "./topic";

@Entity()
export class KeyWord{
    @PrimaryGeneratedColumn()
    ID: number;
    @Column({
        length: '10',
    })
    text: string;
    @ManyToOne(() => Topic, {
        eager: true,
    })
    @JoinColumn({
        name: "topic"
    })
    topic: Topic;
}
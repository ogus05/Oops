import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { KeyWord } from "./keyword";

@Entity()
export class Topic{
    @PrimaryGeneratedColumn()
    ID: number;

    @OneToMany(() => KeyWord, keyword => keyword.topic, {
    })
    keyword: KeyWord[];


    @Column({
        length: 10
    })
    name: string;
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Font{
    @PrimaryGeneratedColumn()
    ID: number;
    @Column({
        length: 30
    })
    name: string;
    @Column({
        type: 'tinyint'
    })
    type: number;

    @Column({
        length: 100,
    })
    url: string;
    @Column({
        length: 20,
    })
    fontFamily: string;
}
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Box } from "./box";

@Entity()
export class Oop{
    @PrimaryGeneratedColumn()
    ID: number;
    @Column({
        type: 'smallint'
    })
    x: number;
    @Column({
        type: 'smallint'
    })
    y: number;
    @Column({
        type: 'tinyint'
    })
    keywordID: number;
    @Column({
        length: 100,
    })
    text: string;
    @Column({
        type: 'tinyint'
    })
    font: number;
    @Column({
        length: 7,
    })
    fontColor: string;
    @Column({
        type: 'tinyint'
    })
    fontSize: number;
    @Column({
        length: 7,
    })
    color: string;
    @Column({
        type: 'smallint'
    })
    size: number;
    @Column({
        length: 7
    })
    borderColor: string;
    
    @ManyToOne(() => Box, box => box.oops, {
    })
    @JoinColumn({
        name: 'box',
    })
    box: Box;
    
}
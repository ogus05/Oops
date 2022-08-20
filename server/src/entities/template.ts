import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Box } from "./box";

@Entity()
export class Template{
    @PrimaryGeneratedColumn()
    ID: number;
    @OneToOne(() => Box, {
        eager: true,
    })
    @JoinColumn()
    box: Box;
}
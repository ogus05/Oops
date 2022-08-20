import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Oop } from "./oop";

@Entity()
export class Box{
    @PrimaryGeneratedColumn()
    ID: number;
    @Column({
        length: 7,
    })
    backgroundColor: string;
    @Column({
        length: 20,
    })
    token: string;
    @Column({
        length: 15,
    })
    password: string;
    
    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


    @OneToMany(() => Oop, oop => oop.box, {
        eager: true,
        cascade: true,
    })
    oops: Oop[];
}
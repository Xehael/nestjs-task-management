import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    @Unique(['username'])
    username: string;
    @Column()
    password: string;
}
import {  Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  ID_user!: number;

  @Column({type: "varchar"})
  email!: string;

  @Column({type: "enum", enum: ["admin", "user", "main"]})
  role!: string;
}
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('chat')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  roomId: string;

  @PrimaryGeneratedColumn('uuid')
  messageId: string;

  @Column()
  sender: string;

  @Column()
  message: string;
}

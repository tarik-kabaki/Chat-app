import { Messages } from 'src/messages/entity/messages.entity';
import { Room } from 'src/room/entity/room.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  image?: string;

  @OneToMany(() => Room, (room) => room.user1)
  room: Room;

  @OneToMany(() => Room, (room) => room.user2)
  rooms: Room;

  @OneToMany(() => Messages, (messages) => messages.users)
  messages: Messages;
}

import { Messages } from 'src/messages/entity/messages.entity';
import { Users } from 'src/users/entity/users.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Users, (user1) => user1.room)
  @JoinColumn({ name: 'user_1' })
  user1: Users;

  @ManyToOne(() => Users, (user2) => user2.rooms)
  @JoinColumn({ name: 'user_2' })
  user2: Users;

  @OneToMany(() => Messages, (messages) => messages.room)
  messages: Messages;
}

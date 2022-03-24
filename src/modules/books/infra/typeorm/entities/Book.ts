import { User } from '../../../../../modules/users/infra/typeorm/entities/User';
import { Field, ID, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity('books')
@ObjectType()
class Book {
  @Field(type => ID, { nullable: true })
  @PrimaryColumn('uuid')
  id: string;

  @Field(type => String)
  @Column()
  title: string;

  @Field(type => String)
  @Column()
  description: string;

  @Field(type => String)
  @Column()
  author: string;

  @Field(type => Boolean)
  @Column()
  borrowed: Boolean;

  @Field(type => User)
  @JoinColumn({ name: 'user_id' })
  @OneToOne(() => User, { eager: true })
  user_id: string;

  @Field(type => User)
  @JoinColumn({ name: 'borrowed_user_id' })
  @OneToOne(() => User, { eager: true })
  borrowed_user_id: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}

export { Book };

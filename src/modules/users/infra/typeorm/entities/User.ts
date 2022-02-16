import { Field, ID, ObjectType } from 'type-graphql';
import {
  Column,
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
@ObjectType()
class User {
  @Field(type => ID)
  @PrimaryColumn('uuid')
  id: string;

  @Field(type => String)
  @Column()
  name: string;

  @Field(type => String)
  @Column()
  email: string;

  @Field(type => String)
  @Column()
  password: string | '';

  @Field()
  @CreateDateColumn()
  created_at: string;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}

export { User };

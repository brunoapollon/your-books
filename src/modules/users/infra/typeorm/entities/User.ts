import { Field, ID, ObjectType } from 'type-graphql';
import { Exclude } from 'class-transformer';
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
  readonly id: string;

  @Field(type => String)
  @Column()
  name: string;

  @Field(type => String)
  @Column()
  email: string;

  @Exclude()
  @Field(type => String, { nullable: true })
  @Column()
  password: string | '';

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}

export { User };

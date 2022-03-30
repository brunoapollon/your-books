import { buildSchema } from 'type-graphql';
import { UserResolvers } from './UserResolvers';

async function buildUserSchema() {
  const userSchema = await buildSchema({
    resolvers: [UserResolvers],
  });

  return userSchema;
}

export default buildUserSchema();

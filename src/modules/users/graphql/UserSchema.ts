import { buildSchema } from 'type-graphql';
import { userResolvers } from './UserResolvers';

async function buildUserSchema() {
  const userSchema = await buildSchema({
    resolvers: [userResolvers],
  });

  return userSchema;
}

export default buildUserSchema();

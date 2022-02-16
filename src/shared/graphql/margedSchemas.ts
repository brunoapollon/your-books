import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import { userResolvers } from '../../modules/users/graphql/UserResolvers';

export async function mergeSchemas(): Promise<GraphQLSchema> {
  const schemas = await buildSchema({
    resolvers: [userResolvers],
  });

  return schemas;
}

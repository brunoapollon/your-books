import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import { UserResolvers } from '../../modules/users/graphql/UserResolvers';
import { BookResolvers } from '../../modules/books/graphql/BookResolvers';

export async function mergeSchemas(): Promise<GraphQLSchema> {
  const schemas = await buildSchema({
    resolvers: [UserResolvers, BookResolvers],
  });

  return schemas;
}

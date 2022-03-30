import { buildSchema } from 'type-graphql';
import { BookResolvers } from './BookResolvers';

async function buildUserSchema() {
  const bookSchema = await buildSchema({
    resolvers: [BookResolvers],
  });

  return bookSchema;
}

export default buildUserSchema();

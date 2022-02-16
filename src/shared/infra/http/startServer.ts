import 'reflect-metadata';
import '../typeorm';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { GraphQLSchema } from 'graphql';

export async function StartServer(schema: GraphQLSchema) {
  const app = express();

  app.use(
    '/your-books-api',
    graphqlHTTP({
      schema,
      graphiql: true,
    }),
  );

  app.listen(3333, () => {
    console.log('server is running on port 3333 🚀');
  });
}

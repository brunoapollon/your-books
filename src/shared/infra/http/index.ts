import { mergeSchemas } from '../../graphql/margedSchemas';
import { StartServer } from './startServer';

async function start() {
  const schemas = await mergeSchemas();

  StartServer(schemas);
}

start();

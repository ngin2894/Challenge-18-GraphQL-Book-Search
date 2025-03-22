import express from 'express';
import path from 'node:path';
import db from './config/connection.js';
import routes from './routes/index.js';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from './graphql';

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  import express from 'express';
  import path from 'node:path';
  import { ApolloServer } from 'apollo-server-express';
  import db from './config/connection.js';
  import routes from './routes/index.js';
  import { typeDefs, resolvers } from './graphql';

  const app = express();
  const PORT = process.env.PORT || 3001;

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const startServer = async () => {
    await server.start();
    server.applyMiddleware({ app });

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/build')));
    }

    app.use(routes);

    db.once('open', () => {
      app.listen(PORT, () =>
        console.log(`🌍 Now listening on localhost:${PORT}${server.graphqlPath}`)
      );
    });
  };

  startServer();
  await server.start();
  server.applyMiddleware({ app });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.use(routes);

  db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});
};

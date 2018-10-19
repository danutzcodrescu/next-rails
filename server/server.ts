import * as express from 'express';
import * as next from 'next';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get('/test', (req, res) => {
      app.render(req, res, '/test');
    });

    server.get('/planets/:id', (req, res) => {
      app.render(
        req,
        res,
        '/planet',
        Object.assign({ id: req.params.id }, req.query)
      );
    });

    server.get('/posts/:id', (req, res) => {
      app.render(
        req,
        res,
        '/post',
        Object.assign({ id: req.params.id }, req.query)
      );
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err: any) => {
      if (err) {
        throw err;
      }
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

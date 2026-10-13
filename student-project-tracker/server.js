import express from 'express';
import { db } from './database.js';

function createApp(database) {
  const app = express();

  app.use(express.json({ limit: '10kb' }));
  app.use(express.static('public'));

  app.get('/api/health', (req, res) => {
    res.json({ ok: true });
  });

  app.get('/api/projects', async (req, res) => {
    res.json(await database.list());
  });

  app.post('/api/projects', async (req, res) => {
    const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';
    const status = req.body?.status;

    if (
      name.length < 1 ||
      name.length > 80 ||
      !['Planned', 'In Progress', 'Completed'].includes(status)
    ) {
      res.status(400).json({
        error: 'Use a name of 1-80 characters and a valid status.'
      });
      return;
    }

    res.status(201).json(await database.create({ name, status }));
  });

  return app;
}

const app = createApp(db);

app.listen(3000, () => console.log('Open http://localhost:3000'));

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

  function readId(req, res) {
    const id = Number(req.params.id);
    if (!Number.isSafeInteger(id) || id < 1) {
      res.status(400).json({ error: 'Invalid project id.' });
      return null;
    }
    return id;
  }

  function readProject(req, res) {
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
      return null;
    }

    return { name, status };
  }

  app.post('/api/projects', async (req, res) => {
    const project = readProject(req, res);
    if (project) res.status(201).json(await database.create(project));
  });

  app.put('/api/projects/:id', async (req, res) => {
    const id = readId(req, res);
    if (id === null) return;

    const project = readProject(req, res);
    if (!project) return;

    const row = await database.update(id, project);
    if (!row) {
      res.status(404).json({ error: 'Project not found.' });
      return;
    }

    res.json(row);
  });

  app.delete('/api/projects/:id', async (req, res) => {
    const id = readId(req, res);
    if (id === null) return;

    if (!await database.remove(id)) {
      res.status(404).json({ error: 'Project not found.' });
      return;
    }

    res.json({ deleted: true });
  });

  return app;
}

const app = createApp(db);

const port = Number(process.env.PORT || 3000);

app.listen(port, (error) => {
  if (error) throw error;
  console.log(`Open http://localhost:${port}`);
});

const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());

server.post('/api/projects', async (req, res) => {
  const project = req.body;

  try {
    const returnedId = await db.insert(project).into('projects');
    res.status(201).json(returnedId);
  } catch (err) {
    res.status(500).json({ error: err });
  }
})

server.post('/api/actions', async (req, res) => {
  const action = req.body;

  try {
    const returnedId = await db.insert(action).into('actions');
    res.status(201).json(returnedId);
  } catch (err) {
    res.status(500).json({ error: err });
  }
})

server.get('/api/projects/:id', async (req, res) => {
  const projectId = req.params.id;

  try {
    const project = await db.select().from('projects').where({ id: projectId }).first();
    const actions = await db.select().from('actions').where({ project_id: projectId });
  
    if (project.completion === 0) {
      project.completion = false;
    } else if (project.completion === 1) {
      project.completion = true;
    }

    for (let i = 0; i < actions.length; i++) {
      if (actions[i].completion === 0) {
        actions[i].completion = false;
      } else if (actions[i].completion === 1) {
        actions[i].completion = true;
      }
    }

    project.actions = actions;

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err });
  }

  
})

const port = 4040;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
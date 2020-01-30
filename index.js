const express = require('express');

const server = express();

server.use(express.json());

const projects = [
  {
    id: "1",
    title: "Novo projeto",
    tasks: ["Nova tarefa"]
  },
  {
    id: "2",
    title: "Tornar desenvolvedor",
    tasks: ["Estudar"]
  }
];

server.use((req, res, next) => {
  console.count("Requisições");

  return next();
});

function CheckProjects(req, res, next) {
  const { id } = req.params;
  const procurar3 = projects.find( p => p.id === id );

  if (!procurar3) {
    return res.status(400).json({ error: 'Project does not exist' }); 
  }

  return next();
};

server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const projeto = {
    id,
    title,
    tasks: []
  };

  projects.push(projeto);

  return res.json(projeto);
});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', CheckProjects, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const procurar = projects.find( p => p.id === id );

  projects[procurar] = title;

  procurar.title = title;

  return res.json(procurar);
});

server.delete('/projects/:id', CheckProjects, (req, res) => {
  const { id } = req.params;

  const procurar1 = projects.find( p => p.id === id );

  projects.splice(procurar1, 1);

  return res.send();
});

server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params;
  const { tasks } = req.body;

  const procurar2 = projects.find( p => p.id === id );

  procurar2.tasks.push(tasks);

  return res.json(procurar2);
});

server.listen(2000);
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Read data from the JSON file
function readDataFromFile() {
  try {
    const data = fs.readFileSync('tasks.json', 'utf8');
    return JSON.parse(data);
  } catch (err) {
    // Handle file read errors, or return an empty array if the file doesn't exist
    return { tasks: [] };
  }
}

// Write data to the JSON file
function writeDataToFile(data) {
  fs.writeFileSync('tasks.json', JSON.stringify(data, null, 2), 'utf8');
}

app.get('/tasks', (req, res) => {
  const data = readDataFromFile();
  res.json(data.tasks);
});

app.post('/tasks', (req, res) => {
  const { task, assignee } = req.body;
  const data = readDataFromFile();

  if (task) {
    data.tasks.push({ task, assignee });
    writeDataToFile(data);
    res.status(201).json({ message: 'Task added successfully' });
  } else {
    res.status(400).json({ message: 'Invalid input' });
  }
});

app.delete('/tasks/:index', (req, res) => {
  const index = req.params.index;
  const data = readDataFromFile();

  if (index >= 0 && index < data.tasks.length) {
    data.tasks.splice(index, 1);
    writeDataToFile(data);
    res.json({ message: 'Task removed successfully' });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

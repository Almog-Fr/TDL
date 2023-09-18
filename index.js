const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

const tasks = [];

app.use(cors());

app.get("/tasks", (req, res) => {
    res.json(tasks);
});

app.post("/tasks", (req, res) => {
    const { task, assignee } = req.body;
    if (task) {
        tasks.push({ task, assignee });
        res.status(201).json({ message: "Task added successfully" });
    } else {
        res.status(400).json({ message: "Invalid input" });
    }
});

app.delete("/tasks/:index", (req, res) => {
    const index = req.params.index;
    if (index >= 0 && index < tasks.length) {
        tasks.splice(index, 1);
        res.json({ message: "Task removed successfully" });
    } else {
        res.status(404).json({ message: "Task not found" });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});




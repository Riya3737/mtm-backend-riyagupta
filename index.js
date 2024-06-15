const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

/*const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
};*/
app.use(cors());


const uri = 'mongodb+srv://riyagupta3773:ssunPo8dh5IDm9Vd@mtm.ibug9he.mongodb.net/?retryWrites=true&w=majority&appName=MTM';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

const TaskSchema = new mongoose.Schema({
    text: String,
    completed: Boolean
});

const Task = mongoose.model('Task', TaskSchema);

app.get("/", async (req, res) => {
    res.status(200).json({ message: "Itinerary planner is live" });
});
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.send(task);
});

app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.send(tasks);
});

app.put('/tasks/:id', async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(task);
});

app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.send({ message: 'Task deleted' });
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
//riyagupta3773   ssunPo8dh5IDm9Vd
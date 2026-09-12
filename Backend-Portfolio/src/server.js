import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

//Import Routes
import CreateUser from './routes/users/CreateUser.js';
import ReadUser from './routes/users/ReadUser.js';
import UpdateUser from './routes/users/UpdateUser.js';
import DeleteUser from './routes/users/DeleteUser.js';
import LoginUser from './routes/users/LoginUser.js';
import CreateProject from './routes/projects/CreateProject.js';
import ReadProject from './routes/projects/ReadProject.js';
import UpdateProject from './routes/projects/UpdateProject.js';
import DeleteProject from './routes/projects/DeleteProject.js';
import CountProject from './routes/projects/CountProject.js';
import CountStack from './routes/stacks/CountStack.js';
import ReadStack from './routes/stacks/ReadStack.js';
import IncrementReload from './routes/analytics/IncrementReload.js';
import ReadReload from './routes/analytics/ReadReload.js';

dotenv.config();
const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'https://www.nolhandev.fr', 'https://nolhandev.fr'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

//Routes Users
app.use('/users', CreateUser);
app.use('/users', ReadUser);
app.use('/users', UpdateUser);
app.use('/users', DeleteUser);
app.use('/auth/login', LoginUser);

//Routes Projects
app.use('/projects/count', CountProject);
app.use('/projects', CreateProject);
app.use('/projects', ReadProject);
app.use('/projects', UpdateProject);
app.use('/projects', DeleteProject);

//Routes Stacks
app.use('/stacks/count', CountStack);
app.use('/stacks', ReadStack);

//Routes Analytics
app.use('/reload', IncrementReload);
app.use('/reload', ReadReload);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

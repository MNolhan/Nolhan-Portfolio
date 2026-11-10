import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ensureRedisConnected } from './infra/RedisClient.js';
import cookieParser from 'cookie-parser';

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
import SendContact from './routes/contact/sendContactMail.js'
import LogoutUser from './routes/users/LogoutUser.js';

const app = express();

app.set('trust proxy', 1);

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://www.nolhandev.fr', 'https://nolhandev.fr'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(cookieParser());

//Routes Users
app.use('/users', CreateUser);
app.use('/users', ReadUser);
app.use('/users', UpdateUser);
app.use('/users', DeleteUser);
app.use('/auth/login', LoginUser);
app.use('/auth/logout', LogoutUser);

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

//Routes Contact
app.use('/contact', SendContact)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

try {
    await ensureRedisConnected();
} catch (error) {
    console.error("Erreur lors de la connexion à Redis:", error);
}
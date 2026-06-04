import express from 'express';
import dotenv from 'dotenv';

//Import Routes
import CreateUser from './routes/users/CreateUser.js';
import ReadUser from './routes/users/ReadUser.js';
import UpdateUser from './routes/users/UpdateUser.js';
import DeleteUser from './routes/users/DeleteUser.js';
import LoginUser from './routes/users/LoginUser.js';

dotenv.config();
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }

    next();
});

app.use(express.json());

//Routes
app.use('/CreateUser', CreateUser);
app.use('/Users', ReadUser);
app.use('/UpdateUser', UpdateUser);
app.use('/DeleteUser', DeleteUser);
app.use('/Login', LoginUser);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

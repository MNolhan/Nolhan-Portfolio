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
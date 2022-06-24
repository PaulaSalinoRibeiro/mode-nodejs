const express = require('express');
const userRouter = require('./routers/userRouter');

const app = express();

app.use(express.json()); 

app.use('/user', userRouter);

app.listen(3000, () => console.log('server is running'));
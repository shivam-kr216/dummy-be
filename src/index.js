const express = require('express');
require('./db');
const User = require('./userModal');

const app = express(); 
app.use(express.json());

app.post('/signup', async (req, res) => {
    const user = new User(req.body);
    console.log(user, " body: ", req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token})
    }
    catch (e) {
        res.status(400).send(e);
    }
})

app.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    }catch(e) {
        res.status(400).send(e);
    }
})


const port = 3000;

app.listen(port, () => {
    console.log('Connected!');
})
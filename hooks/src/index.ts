import express from 'express';

const app = express();

//https://hooks.zapier.com/hooks/catch/22127173/2ljegog/

app.post ('/hooks/catch/:userId/:zapId', (req, res) => {
    const userId= req.params.userId;
    const zapId= req.params.zapId; 
    console.log(req.body);
    res.send('Received');
});
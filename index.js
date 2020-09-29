const express = require('express')

const postRouter = require("./posts/post-router.js")

const server = express();

server.use(express.json());

server.use('/api/post', postRouter)

server.get('/', (req,res) => {
    res.status(200).json({check: "Success"})
});

const port = 999;

server.listen(port, () => {
    console.log(`API is running ... ${port}`)
});
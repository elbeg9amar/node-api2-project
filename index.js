const expresss = require('express')

const postRouter = require("./posts/post-router")

const server = expresss();

server.use(expresss.json());

server.use('/api/post', postRouter)

server.get('/', (req,res) => {
    res.status(200).json({check: "Success"})
});

const port = 999;

server.listen(port, () => {
    console.log(`API is running ... ${port}`)
});
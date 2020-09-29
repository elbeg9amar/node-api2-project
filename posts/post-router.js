const express = require('express')

const files = require('../data/db.js')

const router = express.Router();

router.get('/', (req,res) => {
    files.find(req.query)
    .then(files => {
        res.status(200).json(files)
    })
    .catch(err =>{ 
        console.log(err)
        res.status(500).json({error: "The posts information could not be retrieved." });
    });
});

router.get('/:id', (req,res) => {
    const id = req.params.id;
    files.findById(id)
    .then(file => {
        if( file.length > 0 ){
            res.status(200).json(file)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "The post information could not be retrieved." })
    });
});

router.get('/:id/comments', (req,res) => {
    const id = req.params.id;
    files.findPostComments(id)
    .then(file => {
        if(file.length > 0){
            res.status(200).json(file)
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The comments information could not be retrieved." })
    });
});

router.delete('/:id', (req,res) => {
    files.remove(req.params.id)
    .then(file => {
        if(file){
            res.status(200).json({messege: "Deleted"})
        } else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        };
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "The post could not be removed" })
    });
});

router.post('/',(req,res) => {
    if(!req.body.title || !req.body.contents){
        return res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }
    const newPost = req.body

    files.insert(newPost)
    .then(file => {
        res.status(201).json(newPost)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "There was an error while saving the post to the database"})
    });
});

router.post('/:id/comments', (req,res) => {
    const id = req.params.id
    if(!id) {
        return res.status(400).json({ message: "The post with the specified ID does not exist."})
    }
    const newComment = req.body; 
    newComment.post_id = id
    
    files.insertComment(newComment)
    .then(file => {
        files.findPostComments(id)
        .then(comment => {
            res.status(201).json({comment})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "There was an error while finding the comment"})
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "There was an error while saving the comment to the database"})
    })
})


module.exports = router;
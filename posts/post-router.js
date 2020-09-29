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


module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/hello',function(req,res){
    res.send("a")
});

router.get('/hello2',function(req,res){
    res.send("b")
});

router.get('/hello3',function(req,res){
    res.send("c")
});

router.get('/hello4',function(req,res){
    res.send("d")
});

module.exports = router;
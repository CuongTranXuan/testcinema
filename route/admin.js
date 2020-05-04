
const express = require('express');
const adminRoute = express.Router();
const fs = require('fs');
const path = require('path');
var videoDir = 'E:/Films' //change to actual directory on vps later, /home/ubuntu/video/
const streamServer = 'http://125.212.203.148:8080/hls/'

//util 
function filterFile(){ 
    var filesList;
    fs.readdir(videoDir, function(err, files){
        filesList = files.filter(function(e){
            return path.extname(e).toLowerCase() === '.mkv'
        });
        console.log(filesList);
        return filesList;
    });
}
//routes
adminRoute.get('/',getVideoList);
function getVideoList(req,res,next){
    var filesList;
    fs.readdir(videoDir, function(err, files){
        if (err) console.log(err)
        filesList = files.filter(function(e){
            return path.extname(e).toLowerCase() === '.mkv'
        });
        res.json({filesList});
    });
}
module.exports = adminRoute;
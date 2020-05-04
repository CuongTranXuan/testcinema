//route films definition

const express = require('express');
const filmsRoute = express.Router();
const filmService = require('../film/filmService.js')
//routes 
filmsRoute.get('/',getAllFilm);
filmsRoute.get('/:id',getStream);
filmsRoute.post('/create',addFilm);
filmsRoute.delete('/:id',deleteFilm);
filmsRoute.put('/:id',updateFilm);


//function
function getAllFilm(req,res,next){
    filmService.getAllFilm()
        .then(listFilm => {res.json(listFilm)})
        .catch(err => next(err));
}
function getStream(req,res,next){
    filmService.getFilmInfo(req.params.id)
        .then(link => {res.json(link)})
        .catch(err => next(err));
}
function addFilm(req,res,next){
    filmService.createFilm(req.body)
        .then(() => {res.json({result:'added'})})
        .catch(err => next(err))
}
function deleteFilm(req,res,next){
    filmService.deleteFilm(req.params.id)
        .then(() => res.json({result:'deleted'}))
        .catch(err => next(err));
}
function updateFilm(req,res,next){
    filmService.updateFilm(req.params.id,req.body)
        .then(() => res.json({result: 'updated'}))
        .catch(err => next(err));
}
module.exports = filmsRoute;

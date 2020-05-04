
import config from 'config';
import { authHeader } from '../_helpers';
export const apiService = {
    sendCommand,
    // receiveResult
    getFilmList,
    getFilm,
    addFilm,
    updateFilm,
    removeFilm,
    getVideoList
};

function sendCommand(cmd){
    const header = authHeader();
    header['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'POST',
        headers: header,
        body: JSON.stringify({ cmd})
    };
    return fetch(`${config.apiUrl}/admin/ffmpeg`,requestOptions)
           .then(handleResponse)
}

function getFilmList(){
    const header = authHeader();
    // header['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'GET',
        headers: header,
    };
    return fetch(`${config.apiUrl}/films/`,requestOptions)
    .then(handleResponse)
}
function getFilm(id){
    const header = authHeader();
    const requestOptions = {
        method: 'GET',
        headers: header,
    };
    return fetch(`${config.apiUrl}/films/${id}`,requestOptions)
    .then(handleResponse)
}
function addFilm(film){
    const header = authHeader();
    header['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: header,
        body: JSON.stringify(film)
    };
    return fetch(`${config.apiUrl}/films/create`,requestOptions)
    .then(handleResponse)
}
function updateFilm(film){
    const header = authHeader();
    header['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'PUT',
        // mode: 'cors', // no-cors, *cors, same-origin
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        headers: header,
        body: JSON.stringify(film)
    };
    return fetch(`${config.apiUrl}/films/${film._id}`,requestOptions)
    .then(handleResponse)
}
function removeFilm(id){
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/films/${id}`, requestOptions).then(handleResponse);
}
function getVideoList(){
    const header = authHeader();
    // header['Content-Type'] = 'application/json';
    const requestOptions = {
        method: 'GET',
        headers: header,
    };
    return fetch(`${config.apiUrl}/admin/`,requestOptions)
    .then(handleResponse)
}
function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}


const axios = require('axios');
const client = axios.create({
    baseURL: 'http://125.212.203.148:8080/api/',
    json: true
});

export default {
    async getStream(filmID){
        let res = await client.get('/films',{ 
            params: {
                'filmID': filmID
            }});
        return res.data.film.link;
    },
    async getAllFilm(){
        let res = await client.get('/films')
        return res.data;
    }
}
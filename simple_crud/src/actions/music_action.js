import axios from 'axios';
import { SONG_ROOT } from './common';

export const music_list_api = () => axios.get(`${ SONG_ROOT }/music/`);

export const music_create_api = (data) => axios({
    url: `${ SONG_ROOT }/music/`,
    method: 'post',
    data
});

export const music_update_api = (id, data) => axios({
    url: `${ SONG_ROOT }/music/${id}/`,
    method: 'put',
    data
});
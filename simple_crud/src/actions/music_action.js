import axios from 'axios';

const SONG_ROOT = 'http://localhost:8000/api/song';

export const music_list_api = () => axios.get(`${SONG_ROOT}/music/`);
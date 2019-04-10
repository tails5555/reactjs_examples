import axios from 'axios';
import { SONG_ROOT } from './common';

export const genre_list_api = () => axios.get(`${SONG_ROOT}/genre/`);
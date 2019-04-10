import axios from 'axios';
import { SONG_ROOT } from './common';

export const music_list_api = () => axios.get(`${SONG_ROOT}/music/`);
import axios from 'axios';

import { BBS_URL } from './common';

export const fetch_posts_by_query = (query) => axios.get(`${ BBS_URL }/post/${ query }`);
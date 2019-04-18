import axios from 'axios';

import { BBS_URL } from './common';

export const fetch_all_categories = () => axios.get(`${BBS_URL}/category/`);
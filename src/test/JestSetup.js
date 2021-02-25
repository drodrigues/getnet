import 'regenerator-runtime/runtime';

import path from 'path';
import dotenv from 'dotenv';

const dotEnvTestFile = path.join(__dirname, '.env');

dotenv.config({path: dotEnvTestFile});

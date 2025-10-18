import { getConfigPath } from '../src/configs/configuration'
import * as dotenv from 'dotenv'

// Load environment variables based on NODE_ENV
dotenv.config({ path: getConfigPath() })